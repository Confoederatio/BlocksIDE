Juan Carlos Orozco TODO list:

Layout:
Fix layout to avoid overflowing the full page.
Add scrollbar to debugger pane

- Support comments.

- Add Load and Save

- Save last valid code before generating new blocks (maybe even several copies using diff)

Fix: Use blocks with AddSub for function calls and function definition. The same for methods.
Fix: AddSub show block name in the 0 field.
Fix: AddSub itemCount to represent the actual number of items

Is it possible to put inputs inline on a AddSub block?

Blocks pending:
comments
await (This is ES7 so not a priority for now)

bi_assignment operator change to dropdown selector

- Setup module option in acorn:
Some progress -> named export done, some other export cases are not yet handled
Done -> Import

Parenthesis (Seems to work without implementing the parenthesis block in a simple math example with + and * precedence altered)
Done -> Maps
Done -> Try-Catch
Done -> Catch
Done -> While (Until)
Done -> Switch
Done -> Arrow functions (Gets converted to anonymous function)
Done -> throw
Done -> spread ...
Done -> yield, yield*, function*
Done -> true, false
Done -> Class get, set, etc. Use named classes for constructor, and special blocks for get, set, etc.
Done -> Class extends, super, static
Done -> prototype (it is treated as a normal field maybe that is enough)
Done -> let, const. Use var block with dropdown selector
Done -> multiple variable declaration. Ex. var a=2, b, c
Done -> computed true: a[1], f1()[1]

Done -> function and generator using dropdown selector

