# Generic Filter Templates for Moodle

## Table of Contents
1. [Description](#description)
2. [Usage Examples](#usage-examples)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation of Templates](#installation-of-templates)
4. [Template overview](#template-overview)
   - [Supported Tools](#supported-tools)
     - [Google Drive-based templates](#google-drive-based-templates)
     - [Microsoft SharePoint](#microsoft-sharepoint)
     - [Moodle and other tools](#moodle-and-other-tools)
6. [Tailoring the Templates to Your Site](#tailoring-the-templates-to-your-site)


### Description
The repository contains a set of different templates for Moodle that utilize the Generico filter plugin to insert custom code (HTML, JS, and CSS) enabling the embedding of external digital tools in Moodle.

The project was funded by Aalborg University, so some templates were discontinued due to policies at the university, and all templates are designed to be similar to the space theme design. The bundle and template folders contain the templates that are ready to use and include all features. You just need to point your Moodle administrators to this repository to install the templates (after having installed the Generico plugin). The legacy folder contains the first generation of templates created in the Human-Machine Interaction Research Unit at Aalborg University. Templates marked as !done are templates for digital tools that are no longer supported at Aalborg University.

### Usage Examples
<table style="margin-left: auto; margin-right: auto; border: none;">
 <tr>
 <td style="text-align: center; border: none;"><img src="https://github.com/SteffenLehmann/Generico-Filter-Templates/blob/main/Media/ReadMe/Showcase.gif" style="max-width: 100%;"/></td>
 <td style="text-align: center; border: none;"><img src="https://github.com/SteffenLehmann/Generico-Filter-Templates/blob/main/Media/ReadMe/Showcase-2.gif" style="max-width: 100%;"/></td>
 </tr>
</table>





## Getting Started

### Prerequisites
The templates require two plugins to be functional: 
1. The Generico filter plugin 
[Generico Filter Plugin](https://moodle.org/plugins/filter_generico) and
2. a Generico selector in the text editor; currently, Atto and Tiny are supported.
  - [Generico Atto Plugin](https://moodle.org/plugins/atto_generico)
  - [Generico Tiny Plugin](https://moodle.org/plugins/tiny_generico)

### Installation of Templates
Templates can be installed using the bundles or by manually copying the sections of the template. Each template requires text or code in the following sections: Key, Name, Version, Instructions, Body, End Tag, Custom JS, Custom CSS.
- **Key**: Template identifier
- **Name**: Name in the generated text and the selector menu (Atto / Tiny)
- **Version**: The version it was made in
- **Instruction**: Text or [link to tutorials](https://github.com/SteffenLehmann/Generico-Filter-Templates/tree/main/Tutorials)
- **Body**: HTML field
- **End** Tag: End of HTML code (only used in collapsible sections)
- **Custom** JS: Used to dynamically change template content
- **CSS**: Styling used to make the templates fit with the Moodle theme

## Template overview
### Features
- Dark mode support
- Built-in tutorials for each template: can be found in the instruction field when creating the template or using one of the two template selector plugins.
- State options: If you leave the name field empty, the template will only show the iframe without the summary element.
- Dynamic buttons based on the capability of the iframe:
   -  When all capabilities are available, the iframe will have the following buttons full-screen, link, and download. 

### Supported Tools

#### Google Drive-based templates
- Publish to web template: supports slides, docs, and sheets
- Google edit template supports: slides, docs, and sheets
- Google form template embeds a Google form
- Google PDT template embeds PDFs
- Google folder embeds a folder from Google Drive

#### Microsoft SharePoint
- PowerPoint, Word, Excel, Form, PDF, and Stream (video)
- Microsoft files template supports: PowerPoint, Word, Excel, and Visio.
- Microsoft form embeds the form from OneDrive.
- Microsoft PDF embeds PDFs.
- Microsoft Stream embeds videos using the Stream interface.

#### Moodle and other tools
- Website template supports any activity or resource with its own page (URL) and can be embedded using the website template
- H5P videos have their own template
- Miro template embeds a Miro board
- Panopto template only supports videos from AAU's own Panopto server. Find the `constructEmbedURL` function in the JS to change it.
- Spotify template embeds a Spotify player for a podcast or a song
- SurveyXact templates embed a survey from SurveyXact

## Tailoring the Templates to Your Site
- `removeIframeFocus` for changes to the blue focus signifier.
- `toggleSummary` for any changes to the behavior of the two summary states.
- `setBackgroundColor` for any changes to the dark mode color trigger or style.
- `createNameForSummary` for any changes to the name emote.
- The rest can be changed from within the style sheet.
