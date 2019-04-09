# colornerd

A comprehensive library of color books implemented in Sass, LESS, Stylus, JSON, and CSV - containing over 28,000 swatches from colorbooks released by **Avery**, **Behr**, **Benjamin Moore**, **Dunn Edwards**, **Hallman Lindsay**, **HKS**, **PPG**, **RAL**, **Sherwin Williams**, **TOYO**, **TRUMATCH**, and **Vista**.

![preview](video_v2.gif)

*****

![GitHub release](https://img.shields.io/github/release/jpederson/colornerd.svg?label=github) ![npm](https://img.shields.io/npm/v/colornerd.svg)

*****

## Install

#### NPM

```shell
npm install colornerd
```

#### Yarn

```shell
yarn install colornerd
```

*****

## Get Started

To get started, include the color books and start using colors! 

```scss
// include colornerd
@include "node_modules/colornerd/scss/colornerd";

// use em!
a {
  color: hks( "36-K" );
}

```

The above example is for sass/scss - the function for stylus works exactly the same, but we have to use variables with less. To find out more colors to use, and copy and paste the exact code used to output colors, check out the color picker (index.html in this repository or [use the web-based one for this repo](https://jpederson.com/colornerd/)).

*****

## Copyright Information

All the colorbooks and color names in this library are the property of their respective owners. This is **not an official project** for any book vendor, and neither they, nor the library developer are liable for how it is used. This repository is offered as-is, in order to help make these color books more accessible for a wider variety of users and projects.

