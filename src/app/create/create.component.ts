import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MovieServiceService} from '../Services/movie-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {



  constructor(private movieService:MovieServiceService) { }

  ngOnInit() {
  }

  onAddMovie(form: NgForm) {
     console.log(form.value);

     this.movieService.AddMovieInformation(form.value.title,
      form.value.year, form.value.poster).subscribe();
      console.log(form.value);
    
      form.resetForm();
  }

  

}
