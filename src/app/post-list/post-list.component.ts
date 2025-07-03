import { Component, Input, ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '../post.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnChanges {
  @Input() posts: IPost[] = [];
  paginatedPosts: IPost[] = [];
  currentPage = 0;

  constructor() {}
  ngOnInit() { this.updatePaginatedPosts(); }
  ngOnChanges() { this.updatePaginatedPosts(); }

  onPageChange(event: PageEvent) {
    //Stores the new page index selected by the user into a component variable so the app can display the correct slice of data.
    this.currentPage = event.pageIndex;
    //updates the paginatedPosts array (the posts to show on screen) based on the newly selected page.
    this.updatePaginatedPosts();
  }

  updatePaginatedPosts() {
    // Calculates the index of the first post on the current page. For example, if currentPage is 2, then start = 20
    const start = this.currentPage * 10;
    // Determines the last index to slice to, exclusive. This ensures 10 posts per page.
    const end = start + 10;
    // Extracts a portion of the posts array using .slice(start, end) and updates paginatedPosts, which is what the template displays.
    this.paginatedPosts = this.posts.slice(start, end);
  }
}
