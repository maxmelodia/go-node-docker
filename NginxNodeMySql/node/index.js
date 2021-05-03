const express = require('express')
const app = express()
const gerador = require('gerador-nome')

app.get('/', (req,res) => {
    async function buscaNome(){
        const nome = await gerador.geradorNome()
        return nome
    }    

    async function insert (db,nome) {
        await db.insertPeople(nome);
        return 'ok'
    }
    
    async function consulta (db) {
        const peoples = await db.selectPeoples();
        return peoples
    }

    console.log('Começou!');
    const db = require("./db");
    buscaNome().then(nome => {
        insert(db,nome).then(data => {
            if (data == 'ok'){ 
                consulta(db).then(p => {
                    const fullCycle = 'FullCycle Rocks!!!'

                    let pessoasHtml = p.map(p1 => {
                        return `<li>
                                    ${p1.nome}
                                </li>`
                    })
    
                    const html = `<hmtl>
                                  <h3>${fullCycle}</h3><br/><br/>
                                  <ol>
                                      ${pessoasHtml}
                                  </ol>
                                 <hmtl>`                
                    res.send(html)
    
                })
            } else {
                res.send('FullCycle Rocks!!!')
            }
        })
    })
    console.log('Fim!');
})


app.listen(3000, () => {
    console.log('Rodando na porta 3000...')
})
