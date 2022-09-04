const days = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']

function getDayName(dateString) {
  Array.isArray(dateString) ? (dateString = dateString[0]) : null
  const d = new Date(dateString)
  const dayName = days[d.getDay()]
  return dayName
}

describe('Attend full cicle', () => {
  const uid = ['Uzp4IDvXYRfwDys0Yuu65r40HCU2', '3lmNThZV4WVow70E7hL9xco9bqm2']
  const randomUid = uid[Math.floor(Math.random() * uid.length)]
  //get today day number
  var tzoffset = new Date().getTimezoneOffset() * 60000 //offset in milliseconds
  // rest 10 hours
  var localISOTime = new Date(Date.now() - tzoffset - 10 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, -1)

  const curentTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime()

  const dayName = getDayName(localISOTime)
  // Get the day of the month (1-31)
  const day = new Date(localISOTime).getDate()

  it('create and clone attend', () => {
    cy.login(randomUid)
    cy.mockGeolocation()
    cy.visitMobile('/dashboard')

    cy.get('[data-cy="attend-info"]').should(($p) => {
      expect($p.text()).to.not.contain(dayName)
    })

    cy.get('[data-cy="Reload"]', { timeout: 10000 }).should('be.visible')
    // select first element
    cy.get('#country').select('test3')
    cy.confirmAndSwipe()
    cy.wait(2000)
    cy.confirmAndSwipe()
    // cy.callFirestore('get', 'attendance', {
    //   where: ['author', '==', randomUid],
    //   where: ['curentTime', '>', curentTime],
    //   limit: 1
    // }).then((r) => {
    //   console.log(r)
    //   cy.callFirestore('update', `attendance/${r[0].id}`, {
    //     'data.enterTime': firebase.firestore.FieldValue.arrayUnion(
    //       localISOTime.slice(0, 16)
    //     )
    //   }).then((r) => {
    //     cy.log(r)
    //     cy.log(localISOTime.slice(0, 16))
    //     cy.confirmAndSwipe()
    //   })
    // })
    cy.get('#country').select('test3')
    cy.confirmAndSwipe()
    cy.confirmAndSwipe()

    cy.get('[data-cy="attend-info"]').should(($p) => {
      expect($p.text()).to.contain(`${day} ${dayName}`)
    })
    // cy.get('[data-cy="attendTime"]').should(($p) => {
    //   expect($p.text()).to.contain('9h')
    // })
    cy.contains('Salidas')
    cy.contains('Entradas')

    // MSG test
    const testingText = 'testing'
    cy.get('[data-cy="attend-msg"]')
      .should('have.value', '')
      .type(testingText)
      .should('have.value', testingText)
    cy.get('[data-cy="attend-btn"]').click()
    cy.contains(testingText)

    // cy.contains('Tiempo aproximado:')

    // Got to info page test
    cy.get('[href="/info"]').click()
    cy.url().should('include', '/info')

    cy.get('[data-cy="Confirmar"]').should('not.exist')

    cy.get('[data-cy="prevMonth"]').should('be.visible')
    cy.get('[data-cy="nextMonth"]').should('be.visible')
    cy.get('[data-cy="actualMonth"]').should('be.visible')
    cy.get('[data-cy="attend-row"]').should('be.visible')
    // .should(($p) => {
    //   // get today day number and
    //   expect($p.text()).to.contain('9h')
    // })
  })

  it('check attend info', () => {
    cy.mockGeolocation()
    cy.login(randomUid)
    cy.visitMobile('/dashboard')

    cy.wait(10000)

    cy.callFirestore('get', 'attendance', {
      where: ['author', '==', randomUid],
      limit: 1
    }).then((r) => {
      cy.callFirestore('update', `attendance/${r[0].id}`, {
        'data.enterTime': localISOTime.slice(0, 16)
      }).then((r) => {
        cy.log(r)
      })
    })
  })
})
