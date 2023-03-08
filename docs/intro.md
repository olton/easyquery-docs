---
sidebar_position: 1
slug: /
---

# Introduction

If in short, EasyQuery - a set of components that allow you (as a developer) to implement a functional, user-friendly query builder in your application.

Any modern application typically operates with a certain set of data. Here we are talking about almost any type of applications: the classic desktop programs, web applications or applications for different mobile platforms.

All functionality of any program can be divided into two main components: either it is data entry or retrieval. If the first part is more or less clear, the second involves many different aspects: it is searching, sorting, filtering, reporting, statistics, etc. One thing unites all these subsystems: the users usually require some way to specify what data they need. For example: for what period, for which client, product, employee, etc. Most often, program data are stored in a kind of relational database (SQL Server, MySQL, Access, SQLite, etc.) and support the SQL query language, or some variation of it (HQL, Entity SQL, etc.). Besides, in recent years so-called No-SQL databases become very popular. Many of them have their query languages.

Regardless of the database type and the query language is a programmer’s task to implement a convenient UI for search and filtering data in the program.
Usually it looks like the following:

- The user enters some values which will define the search criteria. For example, a phone number or a client’s ZIP code.
- The program builds a query using these values, executes the query and displays the result to the user.

In this scheme, a set of fields on which to search and query itself remains the same. Only the values of some query parameters can be changed. If you need to add in a search some new attributes (for example, to search additionally by client’s email or address), then it will be necessary to make some changes in the program - add fields on the form, modify the SQL statement in the code, etc.

The solution of the problem is obvious: you need to give your users a possibility to build their queries, with any attributes and search criteria.

There is a class of programs, called "query builders" which solve this problem. However, most such programs are not suitable for regular users since they require some understanding database principles (tables, joins, primary/foreign keys, etc.). Also, these solutions usually offered as standalone programs that require installation and can not be called from your application.

To solve the above problems we developed EasyQuery library.
It is a set of components that you can embed in your program. At the moment, there are several editions of EasyQuery for different platforms: Windows Forms, ASP.NET WebForms, ASP.NET MVC, WPF, Silverlight. EasyQuery components offer a user-friendly, and (also crucial) unified query builder UI for your applications.
Saying "user-friendly" for query builder we mean the following:

- Users operate the concepts that are familiar to them. For example: "Company name" instead of "customer.com_name" or "start with ..." instead LIKE 'A%'
- For each search attribute, you can specify a set of valid values. The user will only need to select the value (s) from this list, instead of typing it manually.
- The query itself is presented to the user as a phrase in a natural language, which he/she can modify visually (add a new statement or modify the existing ones).
- Any query condition can be temporarily disabled (without removing) to see how the result data set will change after that.
- And a lot of other little things that make it easier for users to find the data they need.

EasyQuery is easily configured to work with any database and with a plurality of different query languages. Any query built by users with EasyQuery can be easily saved to a file or database and then loaded back when necessary.
