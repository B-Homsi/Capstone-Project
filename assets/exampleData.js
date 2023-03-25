import { uid } from "uid";

export const exampleData = [
  {
    id: uid(),
    title: "JavaScript Basics",
    color: "#fab005",
    topics: [
      {
        id: uid(),
        title: "Variables",
        cards: [
          {
            id: uid(),
            question: "List all primitive Types.",
            answer: "number, boolean, string, ...",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "What is the difference between null and undefined?",
            answer:
              "null is an assignment value. undefined is a type that indicates the variable has not been assigned a value.",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "What is the difference between == and ===?",
            answer:
              "The == operator performs type coercion. The === operator does not perform type coercion.",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "What is the difference between var, let, and const?",
            answer:
              "var is function scoped. let and const are block scoped. var can be redeclared and updated. let and const can be updated but not redeclared. const cannot be updated or redeclared.",
            lastReviewed: null,
            stage: 0,
          },
        ],
      },
      {
        id: uid(),
        title: "Operators",
        cards: [
          {
            id: uid(),
            question: "What is the difference between ++ and += 1?",
            answer: "++ increments the value by 1. += 1 adds 1 to the value.",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "What is the difference between && and ||?",
            answer:
              "&& returns the first falsy value or the last truthy value. || returns the first truthy value or the last falsy value.",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "What is the difference between the && and & operators?",
            answer:
              "The && operator returns the first falsy value or the last truthy value. The & operator performs a bitwise AND operation.",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "What is the difference between the || and | operators?",
            answer:
              "The || operator returns the first truthy value or the last falsy value. The | operator performs a bitwise OR operation.",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "What is the difference between the ?? and || operators?",
            answer:
              "The ?? operator returns the first defined value or the last value. The || operator returns the first truthy value or the last falsy value.",
            lastReviewed: null,
            stage: 0,
          },
        ],
      },
      {
        id: uid(),
        title: "Functions",
        cards: [
          {
            id: uid(),
            question:
              "What is the difference between a function declaration and a function expression?",
            answer:
              "A function declaration is hoisted. A function expression is not hoisted.",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question:
              "What is the difference between a named function and an anonymous function?",
            answer:
              "A named function can be called recursively. An anonymous function cannot be called recursively.",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "How do you define a default parameter?",
            answer: "function foo(bar = 1) { ... }",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "How do you define a rest parameter?",
            answer: "function foo(...bar) { ... }",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "How do you define a spread operator?",
            answer: "const foo = [1, 2, 3]; const bar = [...foo, 4, 5, 6];",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "How do you define a callback function?",
            answer:
              "function foo(bar) { ... } function baz(callback) { callback(); } baz(foo);",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "How do you define a higher-order function?",
            answer:
              "A function that accepts a callback function as an argument or returns a function as a value.",
            lastReviewed: null,
            stage: 0,
          },
        ],
      },
      {
        id: uid(),
        title: "Arrays",
        cards: [
          {
            id: uid(),
            question:
              "What is the difference between a shallow copy and a deep copy?",
            answer:
              "A shallow copy creates a new array that references the same objects as the original array. A deep copy creates a new array that references new objects.",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question: "Name 5 array methods.",
            answer:
              "map, filter, reduce, forEach, find, findIndex, some, every, sort, reverse, concat, slice, splice, join, push, pop, shift, unshift, includes, indexOf, lastIndexOf, flat, flatMap",
            lastReviewed: null,
            stage: 0,
          },
          {
            id: uid(),
            question:
              "What is the difference between the map and forEach methods?",
            answer:
              "The map method returns a new array. The forEach method does not return a new array.",
            lastReviewed: null,
            stage: 0,
          },
        ],
      },
      { id: uid(), title: "Objects" },
    ],
  },
  {
    id: uid(),
    title: "Backend",
    color: "#228be6",
    topics: [
      { id: uid(), title: "Node.js" },
      { id: uid(), title: "Express" },
      { id: uid(), title: "MongoDB" },
    ],
  },
  {
    id: uid(),
    title: "Mathematics",
    color: "#e64980",
    topics: [
      { id: uid(), title: "Precalculus" },
      { id: uid(), title: "Calculus" },
      { id: uid(), title: "Linear Algebra" },
      { id: uid(), title: "Differential Equations" },
      { id: uid(), title: "Partial Differential Equations" },
    ],
  },
];
