const request = require('supertest');
const mongoose = require('mongoose')
const {Genre} = require('../../sunday/vidly/models/genre')

let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../sunday/vidly/app') });
    afterEach(async () => {
        await server.close();
        await Genre.deleteMany({});
    });
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([ // insertMany() is a mongoose method, populates the database with the array of objects
                {name: 'genre1'},
                {name: 'genre2'}
            ]);
            const res = await request(server).get('/api/genres'); // sending the request from the client to the server
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
          const genre = new Genre({ name: 'genre1' }); // inserting a new genre to test it
          await genre.save();
    
          const res = await request(server).get('/api/genres/' + genre._id);
    
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty('name', genre.name);     
        });
    
        it('should return 404 if invalid id is passed', async () => {
          const res = await request(server).get('/api/genres/1');
    
          expect(res.status).toBe(404);
        });
    
        it('should return 404 if no genre with the given id exists', async () => {
          const id = new mongoose.Types.ObjectId();
          const res = await request(server).get('/api/genres/' + id);
    
          expect(res.status).toBe(404);
        });
      });
    
});