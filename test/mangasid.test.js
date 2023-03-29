import app from "../app.js"
import chai from "chai";
import request from "supertest";
import mongoose from "mongoose";

const assert = chai.assert
const expect = chai.expect

describe('mangas/:id tests',() =>{

  it('Verificar que el id enviado por params es un objectId', async () => {
    let mangaId = "641077cab9d886c21a7b42ed" 
    const isValid = mongoose.Types.ObjectId.isValid(mangaId)
    assert.isTrue(isValid)
  })
  it('Verificar que se pasa un token por headers', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ4MTMwMjVhODE0M2ExY2ViODU4NCIsImlhdCI6MTY3OTI2NDMxOSwiZXhwIjoxNjc5MzUwNzE5fQ.VmzEnzyeTeFOMT-fbE1DMSYFsvwLKCVvyAnnIFxkaSw'
      
      const response=await request(app).get('/api/mangas/641077cab9d886c21a7b42ed')
                                        .set('Authorization', `Bearer ${token}`)
      assert.equal(response.request._header.authorization,`Bearer ${token}`)
  })
  it('Verificar que la respuesta tiene alguna propiedad con el objeto manga', async () =>{
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTA3N2M5YjlkODg2YzIxYTdiNDJjZCIsImlhdCI6MTY3OTM0MTcxOSwiZXhwIjoxNjc5NDI4MTE5fQ.AlQl7hcv_BX_cK9kRuON1I1zJj1e-OywMjXq8wNuRik'
      const response = await request(app).get('/api/mangas/641077cab9d886c21a7b4308')
                                          .set('Authorization', `Bearer ${token}`)
        assert.exists(response.body.manga)                                   
  })
  it('Verificar que la respuesta devuelve un status 404 cuando no encuentra el manga', async () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTA3N2M5YjlkODg2YzIxYTdiNDJjZCIsImlhdCI6MTY3OTM0MTcxOSwiZXhwIjoxNjc5NDI4MTE5fQ.AlQl7hcv_BX_cK9kRuON1I1zJj1e-OywMjXq8wNuRik'
    const response = await request(app)
                            .get('/api/mangas?title=asdd&category=')
                            .set('Authorization', `Bearer ${token}`)
    assert.equal(response.status,404)
  })
})