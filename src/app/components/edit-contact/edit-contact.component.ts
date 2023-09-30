import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from 'src/app/models/IGroup';
import { IContact } from 'src/app/models/icontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent {
  updateContactForm!: FormGroup;
  public contact: IContact = {} as IContact;
  public groups: IGroup[] = [];
  public contactId: string | null = null;
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public groupName: string | null = null;

  

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router : Router
  ) {
    this.updateContactForm = new FormGroup({     
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'mobile' : new FormControl(null, [Validators.required]),
      'title' : new FormControl(null, [Validators.required]),
      'group' : new FormControl(null, [Validators.required]),
      'photo' : new FormControl(null, [Validators.required]),
      'company' : new FormControl(null)
    });
  }

  

  ngOnInit() {
    this.contactService.getGroups().subscribe((data) => {
      this.groups = data;
    });
    this.activatedRoute.paramMap.subscribe((param) => {
        this.contactId = param.get('contactId');
        if (this.contactId != null) {
          this.loading = true;
          this.contactService.getContactById(this.contactId).subscribe((data)=>{
            this.contact = data
            console.log(this.contact);
            this.contactService.getGroupById(this.contact.groupId).subscribe((data) => {
              this.groupName = data.name;
              this.loading = false;      
              console.log(this.groupName);
            });
            // this.updateContactForm.patchValue({
            //   name: this.contact.name,
            //   email: this.contact.email,
            //   number: this.contact.mobile,
            //   jobTitle: this.contact.title,
            //   group: this.groupName,
            //   profilePhoto: this.contact.photo,
            //   company: this.contact.company,
            // });
            this.updateContactForm.setValue({
              name: this.contact.name,
              email: this.contact.email,
              mobile: this.contact.mobile,
              title: this.contact.title,
              group: this.contact.groupId,
              photo: this.contact.photo,
              company: this.contact.company,
            });
          }); 
        }
      },
      (err) => {
        this.errorMessage = err;
        this.loading = false;
      }
    );
    console.log("hii");
    
    // this.updateContactForm = new FormGroup({     
    //   'name': new FormControl(this.contact.name, [Validators.required]),
    //   'email': new FormControl(null, [Validators.required]),
    //   'number' : new FormControl(null, [Validators.required]),
    //   'jobTitle' : new FormControl(null, [Validators.required]),
    //   'group' : new FormControl(null, [Validators.required]),
    //   'profilePhoto' : new FormControl(null, [Validators.required]),
    //   'company' : new FormControl(null)
    // })
  }
  private initializeForm(contact:IContact, groupName: string | null){
    this.updateContactForm = new FormGroup({
      'name': new FormControl(contact.name, [Validators.required]),
      'email': new FormControl(contact.email, [Validators.required]),
      'mobile' : new FormControl(contact.mobile, [Validators.required]),
      'title' : new FormControl(contact.title, [Validators.required]),
      'group' : new FormControl(contact.groupId, [Validators.required]),
      'photo' : new FormControl(contact.photo, [Validators.required]),
      'company' : new FormControl(contact.company)
    })
  }

  onSubmit(){
    this.contact.name = this.updateContactForm.get('name')?.value;
    this.contact.email= this.updateContactForm.get('email')?.value;
    this.contact.mobile= this.updateContactForm.get('mobile')?.value;
    this.contact.photo= this.updateContactForm.get('photo')?.value;
    this.contact.title= this.updateContactForm.get('title')?.value;
    this.contact.company = this.updateContactForm.get('company')?.value;
    this.contact.groupId = this.updateContactForm.get('group')?.value;
    console.log(this.contact);
    if(this.contactId)
    this.contactService.updateContact(this.contactId, this.contact).subscribe((data)=>{
      console.log(data);
    });
    this.router.navigate(['/']).then();
  }
}
