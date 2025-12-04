import { test, expect } from '@playwright/test';
import playwright from 'playwright';
 
test('CRUD', async () => {
  const USERNAME = 'admin'; 
  const PASSWORD = 'Engineer_123'; 

 
  const api = await playwright.request.newContext({
    baseURL: 'https://dev.emeli.in.ua/wp-json/wp/v2',
    extraHTTPHeaders: {
      Authorization:
        'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'),
      'Content-Type': 'application/json',
    },
  });
 

  const create = await api.post('/posts', {
    data: {
      title: 'Playwright post',
      content: 'Created via Playwright',
      status: 'draft',
    },
  });
  //const created = await create.json();
  console.log('RAW TEXT:\n', await create.text());
 // console.log('Created:', created);
 
 // const id = created.id;
 // expect(id).toBeTruthy();
 

  const read = await api.get(`/posts/${id}`);
  console.log('Read:', await read.json());
  expect(read.ok()).toBeTruthy();
 

  const update = await api.post(`/posts/${id}`, {
    data: {
      title: 'Updated title',
      content: 'Updated content',
      status: 'draft',
    },
  });
  console.log('Updated:', await update.json());
  expect(update.ok()).toBeTruthy();
 

  const del = await api.delete(`/posts/${id}?force=true`);
  console.log('Deleted:', await del.json());
  expect(del.ok()).toBeTruthy();
});

// import { expect, test, APIRequestContext } from '@playwright/test';
// import playwright from 'playwright';

// async function createApiContext(): Promise<APIRequestContext> {
//   const base = process.env.WP_BASE_URL ?? 'https://dev.emeli.in.ua';
//   const user = process.env.WP_USERNAME ?? 'admin';
//   const pass = process.env.WP_PASSWORD ?? 'Engineer_123';
//   if (!user || !pass) {
//     throw new Error('Please set WP_USERNAME and WP_PASSWORD environment variables');
//   }

//   const token = Buffer.from(`${user}:${pass}`).toString('base64');
//   return (await playwright.request.newContext({
//     baseURL: `${base}/wp-json/wp/v2`,
//     extraHTTPHeaders: {
//       Authorization: `Basic ${token}`,
//       'Content-Type': 'application/json',
//     },
//   })) as APIRequestContext;
// }

// async function createPost(api: APIRequestContext, data: PostData) {
//   //const resp = await api.post('/posts', { data: JSON.stringify(data) });
//     const resp = await api.post('/posts', { data });
//   const body = await resp.json();
//   return { status: resp.status(), body };
// }

// async function getPost(api: APIRequestContext, id: number) {
//   const resp = await api.get(`/posts/${id}`);
//   const body = await resp.json();
//   return { status: resp.status(), body };
// }

// async function updatePost(api: APIRequestContext, id: number, data: PostData) {
//   const resp = await api.post(`/posts/${id}`, { data: JSON.stringify(data) });
//   const body = await resp.json();
//   return { status: resp.status(), body };
// }

// async function deletePost(api: APIRequestContext, id: number, force = true) {
//   const resp = await api.delete(`/posts/${id}?force=${force}`);
//   const body = await resp.json();
//   return { status: resp.status(), body };
// }

// type PostData = {
//   title?: string;
//   content?: string;
//   status?: 'publish' | 'draft' | 'private' | 'future' | 'pending';
// };

// test('Create → Read → Update → Delete post', async () => {
//   const api = await createApiContext();
//   const createPayload: PostData = {
//     title: `API test post ${Date.now()}`,
//     content: 'This post was created',
//     status: 'draft',
//   };
  
//   const created = await createPost(api, createPayload);
//   console.log(await created.text());
//   expect(created.status).toBeGreaterThanOrEqual(200);
//   expect([200, 201]).toContain(created.status);
//   const postId = created.body.id;
//   expect(postId).toBeDefined();

//   const fetched = await getPost(api, postId);
//   expect(fetched.status).toBe(200);
//   expect(fetched.body.title?.rendered ?? fetched.body.title).toBeTruthy();

//   const updatePayload: PostData = {
//     title: `Updated title ${Date.now()}`,
//     content: 'Updated content',
//     status: 'draft',
//   };
//   const updated = await updatePost(api, postId, updatePayload);
//   expect([200, 201]).toContain(updated.status);
//   expect(updated.body.title?.rendered ?? updated.body.title).toContain('Updated title');

//   const removed = await deletePost(api, postId, true);
//   expect([200, 410]).toContain(removed.status);

//   const afterDelete = await api.get(`/posts/${postId}`);
//   expect([404, 410]).toContain(afterDelete.status());
//   await api.dispose();
// });
