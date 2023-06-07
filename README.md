# AngNgrxTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.5. But then later updated to 16

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. Then run `npm run json-run` to launch json-server on `http://localhost:3000/`

## Overview

This small project was to learn how to use NgRX for state managment in angular. The project is a simple CRUD libaray manager that lets a get all books in the database, create new books, edit book data and delete books. All of this was made using Json-server as the database and all operations are managed through Ngrx. The application has a global state which holds the api responses while the books have a local state that hold the whole array of book data. All CRUD operations read from the whole state or modify a part of the state.

## What I Learned

Ngrx does make it fairly simple to manage state. Although it was kind of confusing in the beginning I noticed that the process was pretty repetivive. 

The first thing was to define an initial state in the store. The store quite literally stores all the data or what people call the "truth" of the application. Next was to create an API route for a CRUD operation. Second I created an action which defines what the operation is meant to do and what data is expected to be inputted or returned. Third I created reducer methods that change the state depending on the action that is invoked. In the component that I want to use the data I created a selector that reads data from the store which holds the state of the application (Selectors need to be registered in the modules the component is located in). Then where we want to do a read or modification of the state we reference the store and use the dispatch method to call the action (we must specify which store we are talking about by properly typing it if we are not in the the module directory).

That is the whole process. After that you basically repeat it for whatever else needs to be tracked. Pretty cool and much simpler than I though it was!
