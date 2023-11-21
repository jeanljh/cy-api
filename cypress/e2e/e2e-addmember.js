/// <reference types='cypress' />
import { key, token } from '../fixtures/auth.json'
import { id } from '../fixtures/board.json'
import { email, type } from '../fixtures/member.json'

describe('Trello API Member Test Suite', () => {
    it('Test Put and Delete member', () => {
        // put request - invite member
        cy.request({
            method: 'put',
            url: `boards/${id}/members`,
            qs: { email, type, key, token },
        })
        .its('body')
        .then(({members, memberships}) => {
            var posMember = members.length -1
            var idMember = members[posMember].id
            var posMembership = memberships.findIndex(m => m.idMember === idMember)
            expect(posMember).not.eq(-1)
            expect(memberships[posMembership].memberType).to.eq('normal')
            // post request - delete member
            cy.request({
                method: 'delete',
                url: `boards/${id}/members/${idMember}`,
                qs: { key, token }
            })
            .its('body.members')
            .invoke('findIndex', m => m.id === idMember)
            .should('eq', -1)
        })
    })
})