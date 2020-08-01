# Options

You can set global options by using `setOptions` function.

Now we support next options:

| Name                    | Description                             | Default value |
| ----------------------- | --------------------------------------- | ------------- |
| removeUnusedQueryFields | options to remove unused query fields   | false         |
| sortingOptions          | for ordering query fields (see options) | -             |
| defaultOptions          | global default values for fields        | -             |

### Sorting options

| Name      | Description                    | Default value |
| --------- | ------------------------------ | ------------- |
| sortBy    | chose sort method              | index         |
| sortOrder | chose sort order (asc or desc) | asc           |


**ATTENTION**: all options is optionals and have default value, you can pass only needed options;