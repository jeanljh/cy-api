/// <reference types='cypress' />
import auth from '../fixtures/auth.json'
import board from '../fixtures/board.json'
import label from '../fixtures/label.json'

describe('Trello API Label Test Suite', () => {
    it('Test Post, Get, Update and Delete Label', () => {
        // post request - add label
        cy.request({
            method: 'post',
            url: `1/labels`,
            qs: {
                name: label['postdata']['name'],
                color: label['postdata']['color'],
                idBoard: board.id,
                key: auth['key'],
                token: auth['token']
            }
        }).then(({status, body: {id, name, color}}) => {
            cy.log(id)
            expect(status).to.eq(200)
            expect(name).to.eq(label.postdata.name)
            expect(color).to.eq(label.postdata.color)
            // get request - get label
            cy.request(`1/labels/${id}?key=${auth.key}&token=${auth.token}`)
            .then(({status, body: {name, color}}) => {
                expect(status).to.eq(200)
                expect(name).to.eq(label.postdata.name)
                expect(color).to.eq(label.postdata.color)
            })
            // put request - update label
            cy.request({
                method: 'put',
                url: `1/labels/${id}`,
                qs: {
                    name: label['putdata']['name'],
                    color: label['putdata']['color'],
                    key: auth.key,
                    token: auth.token
                }
            })
            .then(({status, body: {name, color}}) => {
                expect(status).to.eq(200)
                expect(name).to.eq(label.putdata.name)
                expect(color).to.eq(label.putdata.color)
            })
            // delete request - delete label
            cy.request('delete', `1/labels/${id}?key=${auth.key}&token=${auth.token}`)
            .then(({status, body: {limits}}) => {
                expect(status).to.eq(200)
                expect(Object.values(limits).length).to.eq(0)
            })
        })
    })
})