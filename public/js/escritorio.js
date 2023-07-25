const socket = io()

const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlterta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams( window.location.search )

if( !searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio

divAlterta.style.display = 'none'

socket.on('connect', () => {
    btnAtender.disabled = false
})

socket.on('disconnect', () => {
    btnAtender.disabled = true
})

socket.on('tickets-pendientes', ( ultimo ) => {
    // lblNuevoTicket.innerText = 'Ticket ' + ultimo;
    if( ultimo === 0 ){
        lblPendientes.style.display = 'none'
    }else{
        lblPendientes.style.display = ''
    }
    lblPendientes.innerText = ultimo 
})

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', { escritorio } , ({ ok, ticket }) => {
        if( !ok ){
            lblTicket.innerText = 'nadie'
            return divAlterta.style.display = ''
        }

        lblTicket.innerText = 'ticket' + ticket.numero

    })
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket
    // })

})