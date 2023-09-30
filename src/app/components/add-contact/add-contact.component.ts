import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/models/IGroup';
import { IContact } from 'src/app/models/icontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  addContactForm! : FormGroup;
  public contact : IContact = {} as IContact;
  public groups : IGroup[] = [];
  constructor(private contactService : ContactService, private router : Router){}
  ngOnInit():void{
    this.contactService.getGroups().subscribe((data)=>{
      this.groups=data;      
    })
    this.addContactForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'number' : new FormControl(null, [Validators.required]),
      'jobTitle' : new FormControl(null, [Validators.required]),
      'group' : new FormControl('0', [Validators.required]),
      'profilePhoto' : new FormControl(null, [Validators.required]),
      'company' : new FormControl(null)
    })
  }

  onSubmit(){
    this.contact.name = this.addContactForm.get('name')?.value;
    this.contact.email= this.addContactForm.get('email')?.value;
    this.contact.mobile= this.addContactForm.get('number')?.value;
    this.contact.photo= this.addContactForm.get('profilePhoto')?.value;
    this.contact.title= this.addContactForm.get('jobTitle')?.value;
    this.contact.company = this.addContactForm.get('company')?.value;
    this.contact.groupId = this.addContactForm.get('group')?.value;
    console.log(this.contact);
    this.contactService.addContact(this.contact).subscribe((data)=>{
      console.log(data);
    });
    this.addContactForm.reset();
    this.router.navigate(['/']).then();
  }

  onClear(){
    this.addContactForm.reset();
  }
}
