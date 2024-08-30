import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs";
import { throwError } from "rxjs";
import { Fornecedor } from "../models/Fornecedor";
import { Produto } from "../models/Produto";

@Injectable()
export class ProdutoService{
    constructor(private http: HttpClient) { }

    protected UrlServiceV1: string = "http://localhost:5000/api/";

    obterTodos(): Observable<Produto[]>{
        return this.http
            .get<Produto[]>(this.UrlServiceV1+'produtos')
            .pipe(
                catchError(this.serviceError)
            );
    }

    registrarProdutoAlternativo(produto: FormData): Observable<Produto> {
        return this.http
            .post(this.UrlServiceV1 + 'produtos/adicionar', produto, this.ObterHeaderFormData())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    registrarProduto(produto: FormData): Observable<Produto> {
        return this.http
            .post(this.UrlServiceV1 + 'produtos', produto, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    obterFornecedores(): Observable<Fornecedor[]>{
        return this.http
            .get<Fornecedor[]>(this.UrlServiceV1 + 'fornecedores')
            .pipe(
                catchError(this.serviceError)
            );
    }

    protected ObterHeaderFormData(){
        return {
            headers: new HttpHeaders({
                'Content-Disposition': 'form-data; name="produto"'
            })
        };
    }

    protected ObterHeaderJson(){
        return{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

}