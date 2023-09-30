import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IContact } from '../models/icontact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient:HttpClient) { }

  private serverUrl:string="http://localhost:9000";

  //get all contacts
  public getContact():Observable<IContact[]>{
    let dataUrl = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //get contact by id
  public getContactById(contactId:string):Observable<IContact>{
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataUrl).pipe(catchError(this.handleError));
  }

  //add a contact
  public addContact(contact:IContact):Observable<IContact>{
    let dataUrl = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataUrl, contact).pipe(catchError(this.handleError)); 
  }

  //update a contact
  public updateContact(contactId:string, contact:IContact):Observable<IContact>{
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl, contact).pipe(catchError(this.handleError)); 
  }

  //delete contact
  public deleteContact(contactId:string):Observable<{}>{
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError)); 
  }

  //get all groups
  public getGroups():Observable<IGroup[]>{
    let dataUrl = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //get group by id
  public getGroupById(groupId:string):Observable<IGroup>{
    let dataUrl = `${this.serverUrl}/groups/${groupId}`;
    return this.httpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleError));
  }

  public handleError(error:HttpErrorResponse){
    let errorMessage:string='';
    if(error.error instanceof ErrorEvent){
      //client error
      errorMessage=`Error :${error.error.message}`;
    }
    else{
      //server error
      errorMessage=`Status :${error.status}`;
    }
    return throwError(errorMessage);
  }
}
