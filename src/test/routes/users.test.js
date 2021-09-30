const request = require('supertest')
const app = require('../../app')
const userRepo = require('../../user-repo/userRepo')
const pool = require('../../pool')
const Context = require('../context')

let context;
beforeAll(async () => {
  context = await Context.build();
});
beforeEach(async ()=>{
    await context.reset()
})
afterAll(() => {
  return context.close();
});

it('create a user' , async()=>{
    const startCount = await userRepo.count()

    await request(app()).post('/users').send({
        username : 'test name' ,
        bio : 'test bio'
    }).expect(200)
    const afterCount = await userRepo.count();
    expect(afterCount - startCount).toBe(1)
})
