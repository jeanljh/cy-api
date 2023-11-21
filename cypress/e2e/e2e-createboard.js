/// <reference types="cypress"/>
import { key, token } from "../fixtures/auth.json"
import { name, permissionLevel } from "../fixtures/board.json"

describe('Trello API Board Test Suite', () => {
    it('Test Post, Get, Put and Delete Board', () => {
        cy.request({
            method: 'Post',
            url: 'boards',
            qs: { key, token, name },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.statusText).to.eq('OK')
            expect(res.isOkStatusCode).to.be.true
            expect(res.body.name).to.eq(name)
            cy.request({
                method: 'Get',
                url: 'boards/' + res.body.id,
                qs: { key, token }
            }).its('body.id').should('exist')
            cy.request({
                method: 'Put',
                url: 'boards/' + res.body.id,
                qs: {
                    key,
                    token,
                    'prefs/permissionLevel': permissionLevel
                }
            }).its('body.prefs.permissionLevel').should('contain', permissionLevel)
            cy.request({
                method:'Delete', 
                url: 'boards/' + res.body.id,
                qs: { key, token }
            }).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body._value).to.be.null
            })
        })
    })
})