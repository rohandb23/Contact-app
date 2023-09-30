import { Component } from '@angular/core';
import { IContact } from 'src/app/models/icontact'; 
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent {
  public contacts: IContact[] = [] as IContact[];
  public loading : boolean = false;
  public errorMessage:string | null = null;
  public filteredContacts : IContact[] = [];
  constructor(private contactService : ContactService){}

  ngOnInit():void{
    this.loadDataFromService();
  }

  loadDataFromService(){
    this.loading=true;
    this.contactService.getContact().subscribe(
      (data)=>{       
        this.contacts = data;
        this.filteredContacts = this.contacts;
        this.loading=false;
      },
      (err)=>{
        this.errorMessage = err;
        this.loading=false;
      }
    );
  }

  onDelete(id?:string){
    this.loading=true;
    if(id){
      this.contactService.deleteContact(id).subscribe();
      this.loading=false;
    }
  }

  onSearch(search : string){
    if(!search){
      this.filteredContacts = this.contacts;
    }
    this.filteredContacts = this.contacts.filter((contact)=>
      JSON.stringify(contact).toLowerCase().includes(search.toLowerCase()))
  }
}

