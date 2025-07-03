import { Component, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent {
  @Output() newPost = new EventEmitter<{
    userId: number;
    title: string;
    body: string;
  }>();

  form = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  submit() {
    if (this.form.valid) {
      //object destructuring to pull title and body directly from the form’s current value
      const { title, body } = this.form.value;
      //A secondary safety check to ensure both title and body exist (was getting typing error for )
      if (title && body) this.newPost.emit({ userId: 1, title, body });
      this.form.reset()
    } else {
      // Mark all fields as touched to trigger validation messages
      this.form.markAllAsTouched();

      // Log the specific validation issues to console
      const errors = Object.entries(this.form.controls)
        .filter(([_, control]) => control.invalid)
        .map(([name, control]) => `${name}: ${JSON.stringify(control.errors)}`);
      console.error('Form submission failed. Validation errors:', errors);
    }
  }
}
