import app from '../app.js';
import chai from 'chai';
import request from 'supertest';

const expect = chai.expect;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTA3N2M5YjlkODg2YzIxYTdiNDJkMCIsImlhdCI6MTY3OTQ0NTU2MywiZXhwIjoxNjc5NTMxOTYzfQ.zZ7XlvsZJNlbCbfqDSZJcWm0wnyZ6RLlAuXezOvu3MY';
let manga = {
    title: 'Alice in Borderland',
    cover_photo: 'https://i.postimg.cc/PqQHYqrL/main-alice-in-borderland.jpg',
    description: 'Arisu Ryouhei will be leaving high school soon, but he tries to avoid thinking about his future. One night, when he is with his partner Karube and his friend Chouta, they see some fireworks. After a blinding explosion, they wake up in another world, called Borderland. Here people are forced to participate in violent games, where the participants must fight to survive. Will Arisu, Karube and Chouta be able to survive in this dangerous new world and find their way back to their true world?',
    category_id: '641077c1b9d886c21a7b42c6'
}

describe('Test /mangas', () => {
    it('POST api/mangas verificar que cover_photo es una url', async () => {
        expect(manga.cover_photo).include('https://');
        const response = await request(app).post('/api/mangas/')
            .set('Authorization', `Bearer ${token}`)
            .send(manga)
    })

    it('GET api/mangas verificar que se pasa token por headers', async () => {
        const response = await request(app).get(`/api/mangas/`)
            .auth(token, { type: 'bearer' });
        expect(response.request.header.Authorization).to.equal(`Bearer ${token}`);
    })

    it('POST api/mangas verificar que la respuesta devuelve "no autorizado" cuando no se pasa token', async () => {
        await request(app).post(`/api/mangas`)
            .send(manga)
            .expect(401);
    })

    it('GET api/mangas verificar que la respuesta tiene alguna propiedad con el array de objetos (mangas)', async () => {
        const response = await request(app).get(`/api/mangas`)
            .auth(token, { type: 'bearer' });
        expect(response.body).to.have.property('mangas');
    })
})