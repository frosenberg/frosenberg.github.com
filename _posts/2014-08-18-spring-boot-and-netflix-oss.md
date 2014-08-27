---
layout: post
published: false
title: Spring Boot and Netflix OSS
modified:
categories: tech
excerpt:
tags: [netflix oss, spring, spring boot]
date: 2014-08-18T16:23:21+02:00
---


Test request to POST some movie:

curl -H"Content-Type: application/json" -XPOST  http://localhost:8081/api/movies -d '{
  "name" : "An Inconvenient Truth",
  "year" : "2006",
  "actors" : [
  	{
  		"firstname" : "Al",
  		"lastname" : "Gore"
  	},
  	{
  		"firstname" : "Billy",
  		"lastname" : "West"
  	}
  ]
}'

curl -H"Content-Type: application/json" -XPOST  http://localhost:8081/api/movies -d '{
  "name" : "The Intouchables",
  "year" : "2011",
  "actors" : [
  	{
  		"firstname" : "François ",
  		"lastname" : "Cluzet"
  	},
  	{
  		"firstname" : "Omar",
  		"lastname" : "Sy"
  	}
  ]
}'

Query the results: 

curl http://localhost:8081/api/movies/


curl -H"Content-Type: application/json" -XPOST  http://localhost:8080/api/catalog/entries -d '{ 
	"overall-rating" : 8.7,
	"comments" : [
		"great movie", "awesome"
	],
	"movie" : {
	  "name" : "The Intouchables",
	  "year" : "2011",
	  "actors" : [
	  	{
	  		"firstname" : "François ",
	  		"lastname" : "Cluzet"
	  	},
	  	{
	  		"firstname" : "Omar",
	  		"lastname" : "Sy"
	  	}
	  ]
	}

}'
