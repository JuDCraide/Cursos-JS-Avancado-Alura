class MensagemView extends View{

    //o constructor com o super era desnecessário

    template(model) {

        return model.texto ? `
            <p class='alert alert-info'>${model.texto}</p>
        ` : `<p></p>`;
    }

}