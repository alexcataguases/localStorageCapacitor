import { Component } from '@angular/core';
/*
INSTALAR:-------------------------------
npm install @capacitor/storage
npx cap sync
----------------------------------------
*/
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() { }

  variavelLocal = "";

  async gravarMax() {
    alert(`Gravado!`);
    await Storage.set({
      key: 'name',
      value: 'Max',
    });
  }

  async gravarTed() {
    alert(`Gravado!`);
    await Storage.set({
      key: 'name',
      value: 'Ted',
    });
  }

  async ler() {
    const { value } = await Storage.get({ key: 'name' });
    this.variavelLocal = value;
    alert(`Hello ${value}!`);
  }

  async remover() {
    alert(`Removido!`);
    await Storage.remove({ key: 'name' });
  }

  //-------------- com JSON

  alunos = [
    {
      'id': '1',
      'nome': 'Nathan',
      'telefone': '171'
    },
    {
      'id': '2',
      'nome': 'Igor',
      'telefone': '222'
    },
    {
      'id': '3',
      'nome': 'Stephani',
      'telefone': '555'
    }
  ]

  async gravarVetor() {
    alert(`Gravado!`);
    await Storage.set({
      key: 'students',
      value: JSON.stringify(this.alunos),
    });
    this.lerVetor();
  }

  async apagarVetor() {
    alert(`Removido!`);
    await Storage.remove({ key: 'students' });
    this.lerVetor();
  }

  listaAlunos: any = [];
  async lerVetor() {
    const { value } = await Storage.get({ key: 'students' });
    this.listaAlunos = JSON.parse(value);
  }

  formulario: any = {nome: '', telefone: '' };
  
  async inserirVetor() {
  
    //faz a leitura do localStorage
    const { value } = await Storage.get({ key: 'students' });
    this.listaAlunos = JSON.parse(value);

    //verifica se estava vazio
    if(this.listaAlunos==null){
      this.listaAlunos=[];
    }
    
    //insere na variável temporária
    this.listaAlunos.push({nome: this.formulario.nome,telefone: this.formulario.telefone});

    //grava no localStorage
    await Storage.set({
      key: 'students',
      value: JSON.stringify(this.listaAlunos),
    });
    this.formulario.nome='';
    this.formulario.telefone='';
    this.lerVetor();
  }
  

}
