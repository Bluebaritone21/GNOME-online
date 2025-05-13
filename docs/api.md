# GNOME-online API Documentation

## Window Management

### makeWindow(width, height, contents, onClose)
Creates a new window with specified dimensions and content.

**Parameters:**
- `width`: Width of window (number or CSS string)
- `height`: Height of window (number or CSS string)
- `contents`: DOM element to place inside window
- `onClose`: Optional callback function when window is closed

**Returns:** Window DOM element

### makeWebviewWindow(width, height, url)
Creates a new window containing an iframe with the specified URL.

**Parameters:**
- `width`: Width of window
- `height`: Height of window
- `url`: URL to load in iframe

## Application Registration

### registerApp(icon, openFunction, titleText)
Registers an application in the dash.

**Parameters:**
- `icon`: Path to application icon
- `openFunction`: Function to execute when app is clicked
- `titleText`: Tooltip text for the app icon

## UI Element Helpers

### UIelmnt(type)
Creates a new DOM element.

**Parameters:**
- `type`: HTML element type (e.g., 'div', 'button')
**Returns:** New DOM element

### repos(element, x, y)
Positions an element absolutely.

**Parameters:**
- `element`: DOM element to position
- `x`: X coordinate (number or CSS string)
- `y`: Y coordinate (number or CSS string)

### resize(element, width, height)
Resizes an element.

**Parameters:**
- `element`: DOM element to resize
- `width`: New width (number or CSS string)
- `height`: New height (number or CSS string)

### $(id)
Shorthand for `document.getElementById()`.

**Parameters:**
- `id`: Element ID
**Returns:** DOM element

### label(text, type, className)
Creates a text label element.

**Parameters:**
- `text`: Label text
- `type`: HTML element type (default: 'p')
- `className`: Optional CSS class name
**Returns:** Label DOM element

## Dialog Functions

### confirm(text, callback, level)
Shows a confirmation dialog.

**Parameters:**
- `text`: Message text
- `callback`: Function to call if confirmed
- `level`: Alert level (default: "success")
**Returns:** Window DOM element

### rclickMenu(element, options)
Attaches a context menu to an element, to be spawned on right-click.

**Parameters:**
- `element`: DOM element to attach menu to
- `options`: Array of menu items ({l: label, f: function})

### makeAlert(text, level)
Shows an alert dialog.

**Parameters:**
- `text`: Alert message
- `level`: Alert level (default: "success")
**Returns:** Window DOM element

## Utility Functions

### colour(colorName)
Gets a CSS variable color value.

**Parameters:**
- `colorName`: Name of color variable
**Returns:** CSS variable string

### getIcon(name)
Gets path to a symbolic icon.

**Parameters:**
- `name`: Icon name without -symbolic suffix
**Returns:** Icon path string

## Global Error Handling

The API provides global error and warning functions:
- `error(text)`: Shows error alert
- `warn(text)`: Shows warning alert
- `alert(text)`: Shows standard alert