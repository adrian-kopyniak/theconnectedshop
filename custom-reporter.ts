// custom-reporter.ts
import {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface TestData {
  title: string;
  file: string;
  line: number;
  column: number;
  status: string;
  duration: number;
  error?: string;
  steps: StepData[];
  annotations: Array<{ type: string; description?: string }>;
  attachments: Array<{ name: string; contentType: string; path?: string }>;
  retries: number;
}

interface StepData {
  title: string;
  duration: number;
  error?: string;
  category: string;
}

interface SuiteData {
  title: string;
  tests: TestData[];
  suites: SuiteData[];
}

class CustomReporter implements Reporter {
  private startTime: number = 0;
  private endTime: number = 0;
  private results: TestData[] = [];
  private config?: FullConfig;
  private outputDir: string = 'test-results/custom-report';

  onBegin(config: FullConfig, suite: Suite) {
    this.config = config;
    this.startTime = Date.now();
    console.log(`🚀 Starting test run with ${suite.allTests().length} tests`);
    
    // Create output directory
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const location = test.location;
    const steps: StepData[] = [];

    // Process test steps
    for (const step of result.steps) {
      steps.push({
        title: step.title,
        duration: step.duration,
        error: step.error?.message,
        category: step.category,
      });
    }

    // Collect test data
    const testData: TestData = {
      title: test.title,
      file: location.file,
      line: location.line,
      column: location.column,
      status: result.status,
      duration: result.duration,
      error: result.error?.message,
      steps,
      annotations: test.annotations,
      attachments: result.attachments.map(a => ({
        name: a.name,
        contentType: a.contentType,
        path: a.path,
      })),
      retries: result.retry,
    };

    this.results.push(testData);
  }

  onEnd(result: FullResult) {
    this.endTime = Date.now();
    const duration = this.endTime - this.startTime;

    const stats = {
      total: this.results.length,
      passed: this.results.filter(t => t.status === 'passed').length,
      failed: this.results.filter(t => t.status === 'failed').length,
      skipped: this.results.filter(t => t.status === 'skipped').length,
      flaky: this.results.filter(t => t.status === 'passed' && t.retries > 0).length,
      duration,
    };

    console.log(`\n📊 Test Results Summary:`);
    console.log(`   Total: ${stats.total}`);
    console.log(`   ✅ Passed: ${stats.passed}`);
    console.log(`   ❌ Failed: ${stats.failed}`);
    console.log(`   ⏭️  Skipped: ${stats.skipped}`);
    console.log(`   🔄 Flaky: ${stats.flaky}`);
    console.log(`   ⏱️  Duration: ${(duration / 1000).toFixed(2)}s\n`);

    // Generate HTML report
    this.generateHTMLReport(stats);
    
    console.log(`📁 Report generated: ${path.resolve(this.outputDir, 'index.html')}`);
  }

  private generateHTMLReport(stats: any) {
    // Prepare timeline data
    const timelineData = this.results.map(test => ({
      title: test.title,
      start: this.startTime,
      duration: test.duration,
      status: test.status,
    }));

    const html = `
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Report</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .header {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #667eea;
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .timestamp {
            color: #666;
            font-size: 14px;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
        }
        
        .stat-value {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .stat-label {
            color: #666;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .passed { color: #10b981; }
        .failed { color: #ef4444; }
        .skipped { color: #f59e0b; }
        .flaky { color: #8b5cf6; }
        .total { color: #667eea; }
        
        .filters {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 10px 20px;
            border: 2px solid #e5e7eb;
            background: white;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
            font-weight: 500;
        }
        
        .filter-btn:hover {
            border-color: #667eea;
            color: #667eea;
        }
        
        .filter-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }
        
        .tests-container {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .test-item {
            border-left: 4px solid #e5e7eb;
            padding: 20px;
            margin-bottom: 15px;
            background: #f9fafb;
            border-radius: 8px;
            transition: all 0.2s;
        }
        
        .test-item:hover {
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .test-item.passed { border-left-color: #10b981; }
        .test-item.failed { border-left-color: #ef4444; }
        .test-item.skipped { border-left-color: #f59e0b; }
        
        .test-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .test-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
        }
        
        .test-status {
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .test-status.passed {
            background: #d1fae5;
            color: #065f46;
        }
        
        .test-status.failed {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .test-status.skipped {
            background: #fef3c7;
            color: #92400e;
        }
        
        .test-meta {
            color: #6b7280;
            font-size: 13px;
            margin-bottom: 10px;
        }
        
        .test-error {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 6px;
            padding: 15px;
            margin-top: 10px;
            color: #991b1b;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            white-space: pre-wrap;
        }
        
        .steps {
            margin-top: 15px;
        }
        
        .step-item {
            padding: 10px;
            background: white;
            border-radius: 6px;
            margin-bottom: 8px;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .step-duration {
            color: #6b7280;
            font-size: 12px;
        }
        
        .search-box {
            width: 100%;
            padding: 12px 20px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 14px;
            margin-bottom: 20px;
            transition: border-color 0.2s;
        }
        
        .search-box:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .no-results {
            text-align: center;
            padding: 40px;
            color: #6b7280;
        }
        
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .chart-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .chart-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
        }
        
        .timeline-container {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .timeline-item {
            position: relative;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            background: #f9fafb;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.2s;
        }
        
        .timeline-item:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .timeline-bar {
            height: 30px;
            border-radius: 6px;
            position: relative;
            flex: 1;
            min-width: 50px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            color: white;
            font-size: 12px;
            font-weight: 600;
        }
        
        .timeline-bar.passed {
            background: linear-gradient(90deg, #10b981, #059669);
        }
        
        .timeline-bar.failed {
            background: linear-gradient(90deg, #ef4444, #dc2626);
        }
        
        .timeline-bar.skipped {
            background: linear-gradient(90deg, #f59e0b, #d97706);
        }
        
        .timeline-label {
            flex: 0 0 300px;
            font-size: 14px;
            color: #1f2937;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .timeline-duration {
            flex: 0 0 80px;
            text-align: right;
            color: #6b7280;
            font-size: 13px;
            font-weight: 600;
        }
        
        .section-title {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin: 30px 0 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎭 Test Results Report</h1>
            <div class="timestamp">Generated: ${new Date().toLocaleString('uk-UA')}</div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value total">${stats.total}</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat-card">
                <div class="stat-value passed">${stats.passed}</div>
                <div class="stat-label">Passed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value failed">${stats.failed}</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value skipped">${stats.skipped}</div>
                <div class="stat-label">Skipped</div>
            </div>
            <div class="stat-card">
                <div class="stat-value flaky">${stats.flaky}</div>
                <div class="stat-label">Flaky</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${(stats.duration / 1000).toFixed(1)}s</div>
                <div class="stat-label">Duration</div>
            </div>
        </div>
        
        <h2 class="section-title">📊 Charts & Analytics</h2>
        
        <div class="charts-grid">
            <div class="chart-card">
                <div class="chart-title">Test Status Distribution</div>
                <canvas id="statusChart"></canvas>
            </div>
            <div class="chart-card">
                <div class="chart-title">Test Duration (Top 10)</div>
                <canvas id="durationChart"></canvas>
            </div>
        </div>
        
        <div class="timeline-container">
            <h2 class="chart-title">⏱️ Test Execution Timeline</h2>
            ${this.results
                .sort((a, b) => b.duration - a.duration)
                .map(test => {
                    const percentage = (test.duration / Math.max(...this.results.map(t => t.duration))) * 100;
                    return `
                        <div class="timeline-item">
                            <div class="timeline-label" title="${this.escapeHtml(test.title)}">
                                ${this.escapeHtml(test.title)}
                            </div>
                            <div class="timeline-bar ${test.status}" style="width: ${percentage}%">
                                ${(test.duration / 1000).toFixed(2)}s
                            </div>
                            <div class="timeline-duration">${(test.duration / 1000).toFixed(2)}s</div>
                        </div>
                    `;
                }).join('')}
        </div>
        
        <h2 class="section-title">📝 Test Details</h2>
        
        <div class="tests-container">
            <input type="text" class="search-box" id="searchBox" placeholder="🔍 Search tests...">
            
            <div class="filters">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="passed">Passed</button>
                <button class="filter-btn" data-filter="failed">Failed</button>
                <button class="filter-btn" data-filter="skipped">Skipped</button>
            </div>
            
            <div id="testsContainer">
                ${this.results.map(test => `
                    <div class="test-item ${test.status}" data-status="${test.status}">
                        <div class="test-header">
                            <div class="test-title">${this.escapeHtml(test.title)}</div>
                            <span class="test-status ${test.status}">${test.status}</span>
                        </div>
                        <div class="test-meta">
                            📁 ${this.escapeHtml(path.basename(test.file))} : ${test.line} | 
                            ⏱️ ${(test.duration / 1000).toFixed(2)}s
                            ${test.retries > 0 ? ` | 🔄 Retries: ${test.retries}` : ''}
                        </div>
                        ${test.error ? `
                            <div class="test-error">${this.escapeHtml(test.error)}</div>
                        ` : ''}
                        ${test.steps.length > 0 ? `
                            <div class="steps">
                                ${test.steps.map(step => `
                                    <div class="step-item">
                                        <span>${this.escapeHtml(step.title)}</span>
                                        <span class="step-duration">${(step.duration / 1000).toFixed(2)}s</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    
    <script>
        // Chart.js - Status Distribution (Doughnut)
        const statusCtx = document.getElementById('statusChart').getContext('2d');
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Passed', 'Failed', 'Skipped', 'Flaky'],
                datasets: [{
                    data: [${stats.passed}, ${stats.failed}, ${stats.skipped}, ${stats.flaky}],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(139, 92, 246, 0.8)'
                    ],
                    borderColor: [
                        'rgb(16, 185, 129)',
                        'rgb(239, 68, 68)',
                        'rgb(245, 158, 11)',
                        'rgb(139, 92, 246)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 13
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return label + ': ' + value + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
        
        // Chart.js - Duration Bar Chart (Top 10 longest tests)
        const testsData = ${JSON.stringify(this.results)};
        const sortedTests = [...testsData].sort((a, b) => b.duration - a.duration).slice(0, 10);
        
        const durationCtx = document.getElementById('durationChart').getContext('2d');
        new Chart(durationCtx, {
            type: 'bar',
            data: {
                labels: sortedTests.map(t => t.title.length > 30 ? t.title.substring(0, 30) + '...' : t.title),
                datasets: [{
                    label: 'Duration (seconds)',
                    data: sortedTests.map(t => (t.duration / 1000).toFixed(2)),
                    backgroundColor: sortedTests.map(t => {
                        if (t.status === 'passed') return 'rgba(16, 185, 129, 0.8)';
                        if (t.status === 'failed') return 'rgba(239, 68, 68, 0.8)';
                        return 'rgba(245, 158, 11, 0.8)';
                    }),
                    borderColor: sortedTests.map(t => {
                        if (t.status === 'passed') return 'rgb(16, 185, 129)';
                        if (t.status === 'failed') return 'rgb(239, 68, 68)';
                        return 'rgb(245, 158, 11)';
                    }),
                    borderWidth: 2
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Duration: ' + context.parsed.x + 's';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Seconds'
                        }
                    }
                }
            }
        });
    
        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        const testItems = document.querySelectorAll('.test-item');
        const searchBox = document.getElementById('searchBox');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                testItems.forEach(item => {
                    if (filter === 'all' || item.dataset.status === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Search functionality
        searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            testItems.forEach(item => {
                const title = item.querySelector('.test-title').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    </script>
</body>
</html>
    `;

    fs.writeFileSync(path.join(this.outputDir, 'index.html'), html);
    
    // Save JSON data
    const jsonData = {
      stats,
      tests: this.results,
      generatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(
      path.join(this.outputDir, 'data.json'),
      JSON.stringify(jsonData, null, 2)
    );
  }

  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

export default CustomReporter;