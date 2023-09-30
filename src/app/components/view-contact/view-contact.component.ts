import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/icontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent {
  public contactId : string | null = null;
  public contact : IContact = {} as IContact;
  public loading : boolean = false;
  public errorMessage : string | null = null;
  public groupName : string | null = null;

  constructor(
    private activatedRoute : ActivatedRoute,
    private contactService : ContactService
  ){}

  ngOnInit():void{
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId');
      if(this.contactId != null){
        this.loading=true;
        this.contactService.getContactById(this.contactId).subscribe((data)=>{
          this.contact = data;
          this.contactService.getGroupById(this.contact.groupId).subscribe((data)=>{
            this.groupName = data.name;
            this.loading = false;
          })
        })
      }
    },
    (err)=>{
      this.errorMessage = err;
      this.loading=false;
    })
  }
}
