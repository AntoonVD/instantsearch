---
title: No results
mainTitle: Components
layout: main.pug
category: Components
withHeadings: true
navWeight: 5
editable: true
githubSource: docs/src/components/no-results.md
---

A convenience component that will only be showed when no results are to be yielded.

<a class="btn btn-static-theme" href="../stories/?selectedKind=NoResults">🕹 try out live</a>

## Usage

Basic usage:

```html
<ais-no-results></ais-no-results>
```

Overriding the default content:

 ```html
<ais-no-results>
	<template scope="props">
		No products found for <i>{{ props.query }}</i>.
	</template>
</ais-no-results>
 ```

## Slots

| Name    | Props | Default                                                                                  | Description                                              |
|:--------|:------|:-----------------------------------------------------------------------------------------|:---------------------------------------------------------|
| default | query | `No results matched your query <strong class="ais-no-results__query">{{query}}</strong>` | The content to be displayed when no results are yielded. |

## CSS Classes

| ClassName               | Description       |
|:------------------------|:------------------|
| `ais-no-results`        | Container class   |
| `ais-no-results__query` | The current query |
