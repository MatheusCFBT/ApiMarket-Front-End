import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Produto } from '../models/Produto';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/Fornecedor';
import { ProdutoService } from '../services/produtoService'

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})

export class CadastroComponent implements OnInit {
  
  produtoForm!: FormGroup;
  produto!: Produto;
  errors: any[] =[];
  fornecedores: Fornecedor[] = [];
  imagemForm: any;
  imagemNome!: string;
  imageBase64: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private produtoService: ProdutoService) {

    this.produtoService.obterFornecedores()
      .subscribe({
        next: fornecedores => this.fornecedores = fornecedores,
        error: fail => this.errors = fail.error?.errors
        });
    
    this.imagemForm = new FormData();
  }
  
  ngOnInit(): void {
      this.produtoForm = this.fb.group({
        fornecedorId:'',
        nome:'',
        descricao:'',
        imagemUpload:'',
        imagem:'',
        valor:'0',
        ativo: new FormControl(false),
        nomeFornecedor:''
      });
  }

  cadastrarProduto(){
    if(this.produtoForm.valid && this.produtoForm.dirty){
      
      let produtoForm = Object.assign({}, this.produto, this.produtoForm.value);
      produtoForm.ativo= this.produtoForm.get('ativo')!.value;

      this.produtoHandle(produtoForm)
        .subscribe({
          next: result => {this.onSaveComplete(result)},
          error: fail => {this.onError(fail)}
      });
    }
  }

  onSaveComplete(response:any){
    this.router.navigate(['/lista-produtos']);
  }

  onError(fail:any){
    this.errors = fail.error.errors;
  }

  produtoHandleAlternativo(produto: Produto): Observable<Produto> {
    let formData = new FormData();
    produto.imagem = this.imagemNome;
    produto.imagemUpload = '';

    formData.append('produto',JSON.stringify(produto));
    formData.append('ImagemUpload', this.imagemForm, this.imagemNome);

    return this.produtoService.registrarProdutoAlternativo(formData);
  }

  produtoHandle(produto: Produto): Observable<Produto> {
    produto.imagem = this.imagemNome;
    produto.imagemUpload = this.imageBase64;

    return this.produtoService.registrarProduto(produto);
  }

  upload(file:any){
    this.imagemForm = file[0],
    this.imagemNome = file[0].name;

    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt: any){
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
  }
}
