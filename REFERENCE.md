# Reference

Hugo Creator is a theme for the Hugo Static Site Generator. It is intended for content creators of all varieties. Whether you're a blogger, podcaster or YouTuber - The theme should hopefully meet your needs!

This guide is intended for those that wish to use the theme, giving additional guidance to configure it to your specific scenario. If the theme doesn't meet that, then why not consider [making a contribution](contributing.md)?

- [Reference](#reference)
  - [Site Config Settings](#site-config-settings)
    - [Core Site Configuration](#core-site-configuration)
    - [Menu Configuration](#menu-configuration)
    - [Module Configuration](#module-configuration)
    - [Outputs](#outputs)
    - [Site Configuration Parameters](#site-configuration-parameters)
      - [Content](#content)
      - [Features](#features)
      - [Security](#security)
    - [Privacy Settings](#privacy-settings)
    - [Taxonomy Settings](#taxonomy-settings)
  - [Archetypes](#archetypes)
    - [Blog](#blog)
      - [Blog Frontmatter Details](#blog-frontmatter-details)
    - [Episode](#episode)
      - [Episode frontmatter details](#episode-frontmatter-details)
    - [Person](#person)
      - [Person Frontmatter Details](#person-frontmatter-details)
    - [Series](#series)
      - [Series Frontmatter Details](#series-frontmatter-details)
    - [Talk](#talk)
      - [Talk Frontmatter Details](#talk-frontmatter-details)

## Site Config Settings

Below is an example configuration for the Hugo Creator Theme. Be aware that this contains extra configuration that may not be needed in your specific deployment and is purely to show the end-to-end options available. For more detailed information on the required configuration settings, please view the tables further below in this doc.

```yaml
##### 
# Core Site Settings
#####

baseURL: "localhost:1313"     # BaseURL of the website, used in RSS feeds and site rendering
buildFuture: true             # Include content with publishdate in the future
defaultContentLanguage: "en"  # Default language to be used across the site.
enableRobotsTXT: true         # Generate a customized robots.txt
languageCode: "en-gb"         # Used as part of the XML generation
theme: "hugo-creator"         # Name of the theme. Don't change this from hugo-creator.
themesDir: "../../"           # Where the theme directory is stored. Not required, defaults to theme/.
title: "Hugo Creator Theme"   # Title of the website

##### 
# Menu Display
##### 
menu: # Main Menu
  # Main Menu (Top Navigation)
  main:
    - name: "Home"
      weight: 1
      url: "/"
    - name: "About"
      weight: 2
      url: "/about"
    - name: "Episodes"
      identifier: "episodes"
      weight: 3
      url: "#"
    - name: "Past"
      url: "/episode"
      weight: 1
      parent: "episodes"
    - name: "Upcoming"
      url: "/upcoming"
      weight: 2
      parent: "episodes"
    - name: "Blog"
      weight: 4
      url: "/Blog"
    - name: "Talks"
      weight: 5
      url: "/talk"
    - name: "People"
      weight: 6
      url: "/person"
    - name: "Series"
      weight: 7
      url: "/series"
  # Footer Menu (Bottom Navigation)
  footer:
    - name: "Get Involved"
      weight: 1
      url: "#"
    - name: "Code of Conduct"
      weight: 1
      url: "/code-of-conduct"
    - name: "Privacy"
      weight: 2
      url: "/privacy-policy"
    - name: "Cookies"
      weight: 3
      url: "/cookie-policy"

# These are required to mount the needed dependencies into the theme.
# Unless you know what you are doing, it is recommended to keep this
# as-is.
module:
  mounts:
    - source: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
      target: "assets/js/bootstrap.bundle.min.js"
    - source: "node_modules/bootstrap/scss"
      target: "assets/sass/bootstrap"
    - source: "./node_modules/@fortawesome/fontawesome-free/scss"
      target: "assets/sass/fontawesome"
    - source: "./node_modules/@fortawesome/fontawesome-free/webfonts"
      target: "static/webfonts"
    - source: content
      target: content
    - source: static
      target: static
    - source: layouts
      target: layouts
    - source: data
      target: data
    - source: assets
      target: assets
    - source: i18n
      target: i18n
    - source: archetypes
      target: archetypes

# This enables the search functionality
# to work, as it searches over the json file.
# In effect, this allows the layouts/index.json
# file to be rendered.
outputs:
  home:
    - "HTML"
    - "RSS"
    - "JSON"

# Custom Parameters that drive the site's
# configuration. This includes custom
# functionality, such as comments,
# RSS feed options, etc.
params:
  # Parameters relating to site content
  content:
    # Links to channels for the platform. This will be
    # for the site itself, rather than a specific user.
    channels:
      apple: "https://podcasts.apple.com/gb/podcast/cloud-with-chris/id1499633784"
      google: "https://podcasts.google.com/feed/aHR0cHM6Ly93d3cuY2xvdWR3aXRoY2hyaXMuY29tL2VwaXNvZGUvaW5kZXgueG1s?sa=X&ved=0CAMQ4aUDahcKEwiwsr2N1ePtAhUAAAAAHQAAAAAQBA"
      spotify: "https://open.spotify.com/show/3oBrdKm5grzl58GBiV0j2y"
    # Configuration information related to the RSS feed.
    # Several of these options will drive the metadata used
    # by external feeds for Podcasts, for example, Apple Podcasts.
    #
    # Note: Do not use markdown in these fields, as they are rendered
    # in an RSS feed.
    feed:
      explicit: "no" # This is set to either yes or no.
      itunes_author: "Chris Reddington"
      itunes_image: "https://www.cloudwithchris.com/img/cloudwithchrislogo.png" # This should be an absolute URL.
      itunes_subtitle: "Exploring Cloud concepts with Chris Reddington!"
      itunes_summary: "Exploring Cloud concepts with Chris Reddington (Welsh Tech Geek, Cloud Advocate, Musical Theatre Enthusiast and Improving Improviser!). We will regularly invite guests to talk about their experiences with the cloud and hear about some of the lessons learned around their cloud journey."
      itunes_owner_name: "Chris Reddington"
      itunes_owner_email: "chris@cloudwithchris.com" # Contains the e-mail address that will be used to contact the owner about their Podcast on iTunes. Note that this will be publicly available in your markdwon file, as well as the RSS feed.
      itunes_top_category: "Technology" # https://podcasters.apple.com/support/1691-apple-podcasts-categories
      itunes_first_sub_category: "Podcasting"
      itunes_second_sub_category: "Software How-To"
      language: "en-gb"
    # Configuration information for the site itself. Some of 
    # this will also be used within RSS feeds, etc.
    site:
      author: "Chris Reddington" # Owner of the site
      copyright:
        additional_information: "[Hugo Creator](https://github.com/cloudwithchris/Hugo-Creator) theme created by [Chris Reddington](https://www.cloudwithchris.com)" # I'd greatly appreciate if you would keep this in!
        established: "2020" # Year established (i.e. start year in a range)
        notice: "[Chris Reddington](https://www.christianreddington.co.uk). Proudly running using [Hugo](https://gohugo.io/)." # Your Copyright
      description: "This is my wonderful site description" # This is used in site metadata and RSS feeds.
      #####
      # Keywords
      #####
      #
      # Keywords are used for site metadata tags.
      # These are concatenated with tags from pages.
      #
      keywords:
        - list
        - your
        - keywords
        - here
      language_name: "English"
      logo: "/img/Cloud.png" # Relative path to the site's logo
      media_prefix: "https://podcasts.cloudwithchris.com/" # Media_Prefix is used when referencing podcast audio files. The media files in individual episodes will be concatenated after the media_prefix above.
      ogimage: "/img/cloudwithchrislogo.png" # Used within RSS feeds.
    social:
      discord: "" # Your discord invite 
      facebook: "" # Your Facebook Page
      github: "" # Your GitHub Profile or repo
      linkedin: "" # Your linkedin profile e.g. linkedin.com/in/<YourSlugHere>
      tiktok: "cloudwithchris" # Your tiktok profile e.g. tiktok.com/@<YourSlugHere>
      twitter: "CloudWithChris" # Your twitter handle
      twitter_domain: "cloudwithchris.com" # This domain shows in twitter cards as "View on `twitter_domain`"
      youtube: "CloudWithChris" # Your youtube channel name
  # Parameters relating to site features and functionality
  features:
    # Settings relating to audio players embedded 
    # within the site.
    audio_player:
      use: "podscribe"  # The optionms are default or podscribe
      podscribe:
        someconfig: "tbc"
    # Settings related to analytics
    analytics:
      googleAnalytics: ""       # Google Analytics ID
      microsoftClarity: ""
    # Settings related to the comments section
    # embedded within the site.
    comments:
      giscus:
        repository: ""
        repository_id: ""
        category: "Content Discussion"
        category_id: "DIC_kwDODmTrrM4B-kuQ"
        mapping: "pathname"
        reactions_enabled: 1
        emit_metadata: 0
        theme: "light"
    # Settings related to the Social bar at top of site
    socialbox: true
  # Settings relating to site security. This mainly
  # comprises of Content Security Policies.
  security:
    # If all CSP properties are empty strings, then
    # the CSP section will not be rendered. If at least 1
    # contains a string, then it will be rendered.
    csp:
      scriptsrc: ""
      imgsrc: ""
      connectsrc: ""
      framesrc: ""
      objectsrc: ""
# Privacy options built in to hugo. The hugo docs explain how to configure this to align with GDPR, so please make sure to ensure this is configured as appropriate for your deployment.
# -
# https://gohugo.io/about/hugo-and-gdpr/
privacy:
  googleAnalytics:
    anonymizeIP: true
    disable: false
    respectDoNotTrack: true
    useSessionStorage: false
# Taxonomies in hugo are used to easily identify content that belongs
# to a given piece of metadata. This is particularly useful for tags,
# or pieces of content that appear in a series. All taxonomies used within
# the theme are configured below.
taxonomies:
  tag: "tags"
  series: "series"
```

### Core Site Configuration

| Field Name             | Required | Description                                                                                                                                                                                                                                                | Example               |
|------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| baseURL                | Yes      | The BaseURL of the hugo website, as shown at https://gohugo.io/getting-started/configuration/#all-configuration-settings                                                                                                                                   | http://localhost:1313 |
| buildFuture            | Yes      | Required if you would like to include content with publishdate in the future                                                                                                                                                                               | true                  |
| defaultContentLanguage | Yes      | Default language to be used across the site.                                                                                                                                                                                                               | en                    |
| enableRobotsTXT        | Yes      | Recommended to set to true, as shown at https://gohugo.io/templates/robots/                                                                                                                                                                                | true                  |
| languageCode           | Yes      | The default language code for the website. The theme is capable of multi-lingual support. You just need to add additional languages to the config file, and then ensure the appropriate language-code suffixes are set in the file extensions for content. | en-us                 |
| theme                  | Yes      | Name of the theme. Unless you decide to change themes, you should not change this.                                                                                                                                                                         | hugo-creator          |
| themesDir              | No       | Where the theme directory is stored. If you move the theme directory, you need to update this setting. Hugo looks in the themes directory by default.                                                                                                      | themes/               |
| title                  | Yes      | Title of the site. This will update the title in the Site Title (impacting SEO), Root of the Breadcrumbs and RSS feeds.                                                                                                                                    | Cloud With Chris      |

### Menu Configuration

There are two configurable menu sections on the site. The navigation bar (at the top of the page), as well as the footer bar (at the bottom of the page). This section of the configuration follows [Hugo's standard content management format for menus](https://gohugo.io/content-management/menus/). An example is shown below.

```yaml
##### 
# Menu Display
##### 
menu: # Main Menu
  # Main Menu (Top Navigation)
  main:
    - name: "Home"
      weight: 1
      url: "/"
    - name: "About"
      weight: 2
      url: "/about"
    - name: "Episodes"
      identifier: "episodes"
      weight: 3
      url: "#"
    - name: "Past"
      url: "/episode"
      weight: 1
      parent: "episodes"
    - name: "Upcoming"
      url: "/upcoming"
      weight: 2
      parent: "episodes"
    - name: "Blog"
      weight: 4
      url: "/Blog"
    - name: "Talks"
      weight: 5
      url: "/talk"
    - name: "People"
      weight: 6
      url: "/person"
    - name: "Series"
      weight: 7
      url: "/series"
  # Footer Menu (Bottom Navigation)
  footer:
    - name: "Get Involved"
      weight: 1
      url: "#"
    - name: "Code of Conduct"
      weight: 1
      url: "/code-of-conduct"
    - name: "Privacy"
      weight: 2
      url: "/privacy-policy"
    - name: "Cookies"
      weight: 3
      url: "/cookie-policy"
```

### Module Configuration

The theme requires external dependencies focused around bootstrap. As a result, you will need to make sure that you execute ``npm ci`` as part of the build process. The theme then has to reference those compiled assets. To achieve this, the theme utilises [Hugo's Module Config: mounts](https://gohugo.io/hugo-modules/configuration/#module-config-mounts) capability.

> **Note:** If you are unfamiliar with this, then it is recommended to keep this as the default.

```yaml
module:
  mounts:
    - source: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
      target: "assets/js/bootstrap.bundle.min.js"
    - source: "node_modules/bootstrap/scss"
      target: "assets/sass/bootstrap"
    - source: "./node_modules/@fortawesome/fontawesome-free/scss"
      target: "assets/sass/fontawesome"
    - source: "./node_modules/@fortawesome/fontawesome-free/webfonts"
      target: "static/webfonts"
    - source: content
      target: content
    - source: static
      target: static
    - source: layouts
      target: layouts
    - source: data
      target: data
    - source: assets
      target: assets
    - source: i18n
      target: i18n
    - source: archetypes
      target: archetypes
```

### Outputs

Hugo is capable of outputting content into several formats. To achieve this, it has to be declared in the site config file. An example of this is shown below, and is the minimum required to generate the site itself (HTML), RSS Feeds (for publishing episodes to podcast providers) and JSON (to build a searchable index of the site's contents).

> **Note:** If you are unfamiliar with this, then it is recommended to keep this as the default.

```yaml
# This enables the search functionality
# to work, as it searches over the json file.
# In effect, this allows the layouts/index.json
# file to be rendered.
outputs:
  home:
    - "HTML"
    - "RSS"
    - "JSON"
```

### Site Configuration Parameters

The Site's configuration parameters are split into two sections, **content** and **features**:

- **Content** is focused around how the site's content is rendered.
- **Features** is focused around giving user flexibility to enable/disable certain aspects of the site.
- **Security** is focused around enhancing the site's security posture. This is separate to the built-in Hugo privacy controls, focusing on topics such as Content Security Policies.

```yaml
# Custom Parameters that drive the site's
# configuration. This includes custom
# functionality, such as comments,
# RSS feed options, etc.
params:
  
  # Parameters relating to site content
  content:
    ...
  
  # Parameters relating to site content
  features:
    ...
```

#### Content

The configuration options within this section are focused around how the site's content is rendered.

```yaml
  # Parameters relating to site content
  content:
    # Links to channels for the platform. This will be
    # for the site itself, rather than a specific user.
    channels:
      apple: "https://podcasts.apple.com/gb/podcast/cloud-with-chris/id1499633784"
      google: "https://podcasts.google.com/feed/aHR0cHM6Ly93d3cuY2xvdWR3aXRoY2hyaXMuY29tL2VwaXNvZGUvaW5kZXgueG1s?sa=X&ved=0CAMQ4aUDahcKEwiwsr2N1ePtAhUAAAAAHQAAAAAQBA"
      spotify: "https://open.spotify.com/show/3oBrdKm5grzl58GBiV0j2y"
    # Configuration information related to the RSS feed.
    # Several of these options will drive the metadata used
    # by external feeds for Podcasts, for example, Apple Podcasts.
    #
    # Note: Do not use markdown in these fields, as they are rendered
    # in an RSS feed.
    feed:
      explicit: "no" # This is set to either yes or no.
      itunes_author: "Chris Reddington"
      itunes_image: "https://www.cloudwithchris.com/img/cloudwithchrislogo.png" # This should be an absolute URL.
      itunes_subtitle: "Exploring Cloud concepts with Chris Reddington!"
      itunes_summary: "Exploring Cloud concepts with Chris Reddington (Welsh Tech Geek, Cloud Advocate, Musical Theatre Enthusiast and Improving Improviser!). We will regularly invite guests to talk about their experiences with the cloud and hear about some of the lessons learned around their cloud journey."
      itunes_owner_name: "Chris Reddington"
      itunes_owner_email: "chris@cloudwithchris.com" # Contains the e-mail address that will be used to contact the owner about their Podcast on iTunes.
      itunes_top_category: "Technology" # https://podcasters.apple.com/support/1691-apple-podcasts-categories
      itunes_first_sub_category: "Podcasting"
      itunes_second_sub_category: "Software How-To"
      language: "en-gb"
    # Configuration information for the site itself. Some of 
    # this will also be used within RSS feeds, etc.
    site:
      author: "Chris Reddington" # Owner of the site
      copyright:
        additional_information: "[Hugo Creator](https://github.com/cloudwithchris/Hugo-Creator) theme created by [Chris Reddington](https://www.cloudwithchris.com)" # I'd greatly appreciate if you would keep this in!
        established: "2020" # Year established (i.e. start year in a range)
        notice: "[Chris Reddington](https://www.christianreddington.co.uk). Proudly running using [Hugo](https://gohugo.io/)." # Your Copyright
      description: "This is my wonderful site description" # This is used in site metadata and RSS feeds.
      #####
      # Keywords
      #####
      #
      # Keywords are used for site metadata tags.
      # These are concatenated with tags from pages.
      #
      keywords:
        - list
        - your
        - keywords
        - here
      language_name: "English"
      logo: "/img/Cloud.png" # Relative path to the site's logo
      media_prefix: "https://podcasts.cloudwithchris.com/" # Media_Prefix is used when referencing podcast audio files. The media files in individual episodes will be concatenated after the media_prefix above.
      ogimage: "/img/cloudwithchrislogo.png" # Used within RSS feeds.
    social:
      facebook: "CloudWithChris"
      github: "chrisreddington/cloudwithchris.com"
      twitter: "reddobowen"
      twitter_domain: "cloudwithchris.com" # This domain shows in twitter cards as "View on `twitter_domain`"
      youtube: "CloudWithChris"
```

| Field Name | Required | Description                                                                                                                                                                                                                                                                                      | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| channels   | Yes      | A property containing subproperties which map to strings. Those strings are the full URL to an external channel.   Examples include apple, google and spotify.                                                                                                                                   | channels:       apple: "https://podcasts.apple.com/gb/podcast/cloud-with-chris/id1499633784"       google: "https://podcasts.google.com/feed/aHR0cHM6Ly93d3cuY2xvdWR3aXRoY2hyaXMuY29tL2VwaXNvZGUvaW5kZXgueG1s?sa=X&ved=0CAMQ4aUDahcKEwiwsr2N1ePtAhUAAAAAHQAAAAAQBA"       spotify: "https://open.spotify.com/show/3oBrdKm5grzl58GBiV0j2y"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| feed       | Yes      | Configuration information related to the RSS feed. Several of these options will adjust the metadata used by external feeds to render your podcasts on their platforms (e.g. Apple Podcasts, Google Podcasts).  **Note:** Do not use markdown in these fields. They are rendered in an RSS feed. | feed:   explicit: "no" # This is set to either yes or no.   itunes_author: "Chris Reddington"   itunes_image: "https://www.cloudwithchris.com/img/cloudwithchrislogo.png" # This should be an absolute URL.   itunes_subtitle: "Exploring Cloud concepts with Chris Reddington!"   itunes_summary: "Exploring Cloud concepts with Chris Reddington (Welsh Tech Geek, Cloud Advocate, Musical Theatre Enthusiast and Improving Improviser!). We will regularly invite guests to talk about their experiences with the cloud and hear about some of the lessons learned around their cloud journey."   itunes_owner_name: "Chris Reddington"   itunes_owner_email: "chris@cloudwithchris.com" # Contains the e-mail address that will be used to contact the owner about their Podcast on iTunes.   itunes_top_category: "Technology" # https://podcasters.apple.com/support/1691-apple-podcasts-categories   itunes_first_sub_category: "Podcasting"   itunes_second_sub_category: "Software How-To"   language: "en-gb"                                                                                                                                                                   |
| site       | Yes      | Configuration information for the site itself. Several of these properties will impact the content rendered in RSS feeds.                                                                                                                                                                        | site:   author: "Chris Reddington" # Owner of the site   copyright:     additional_information: "[Hugo Creator](https://github.com/cloudwithchris/Hugo-Creator) theme created by [Chris Reddington](https://www.cloudwithchris.com)" # I'd greatly appreciate if you would keep this in!     established: "2020" # Year established (i.e. start year in a range)     notice: "[Chris Reddington](https://www.christianreddington.co.uk). Proudly running using [Hugo](https://gohugo.io/)." # Your Copyright   description: "This is my wonderful site description" # This is used in site metadata and RSS feeds.   #####   # Keywords   #####   #   # Keywords are used for site metadata tags.   # These are concatenated with tags from pages.   #   keywords:     - list     - your     - keywords     - here   language_name: "English"   logo: "/img/Cloud.png" # Relative path to the site's logo   media_prefix: "https://podcasts.cloudwithchris.com/" # Media_Prefix is used when referencing podcast audio files. The media files in individual episodes will be concatenated after the media_prefix above.   ogimage: "/img/cloudwithchrislogo.png" # Used within RSS feeds. |
| social     | Yes      | Configures the URLs that point towards the website's social platforms (e.g. Twitter, LinkedIn, etc.)                                                                                                                                                                                             | social:   facebook: "CloudWithChris"   github: "chrisreddington/cloudwithchris.com"   twitter: "reddobowen"   twitter_domain: "cloudwithchris.com" # This domain shows in twitter cards as "View on `twitter_domain`"   youtube: "CloudWithChris"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

#### Features

The configuration options in this section are focused around giving user flexibility to enable/disable certain aspects of the site.

```yaml
# Parameters relating to site features and functionality
features:
  # Settings relating to audio players embedded 
  # within the site.
  audio_player:
    use: "podscribe"  # The optionms are default or podscribe
    podscribe:
      someconfig: "tbc"
  # Settings related to analytics
  analytics:
    googleAnalytics: ""       # Google Analytics ID
    microsoftClarity: ""
  # Settings related to the comments section
  # embedded within the site.
  comments:
    giscus:
      repository: ""
      repository_id: ""
      category: "Content Discussion"
      category_id: "DIC_kwDODmTrrM4B-kuQ"
      mapping: "pathname"
      reactions_enabled: 1
      emit_metadata: 0
      theme: "light"
    # Settings related to the Social bar at top of site
    socialbox: true
```

| Field Name   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Example                                                                                                                                                                                                                                                                                                 |
|--------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| audio_player | Yes      | Settings related to audio players embedded within the site.  Details on subproperties:  **use** controls which player is used. Options are default or podscribe. **podscribe** contains a configuration blog which relates to the podscribe configuration.                                                                                                                                                                                                                                                                                                                                                                                                                             | audio_player:   use: "podscribe"  # The optionms are default or podscribe   podscribe:     someconfig: "tbc"                                                                                                                                                                                            |
| analytics    | No       | Configuration settings to associate your Google Analytics / Microsoft Clarity telemetry.  Details on subproperties:  **googleAnalytics** is the Tracking ID of your Google Analytics **microsoftClarity** is the tracking code provided in the Setup experience of Microsoft Clarity (e.g. the last string in the Clarity tracking codeblock)                                                                                                                                                                                                                                                                                                                                          | # Settings related to analytics analytics:   googleAnalytics: ""       # Google Analytics ID   microsoftClarity: ""                                                                                                                                                                                     |
| comments     | Yes      | Configuration settings relating to the comments system that is configured on the site.  Details on subproperties:  * **giscus** has several subproperties   * **repository** is the name as displayed on GitHub, e.g. CloudWithChris/cloudwithchris.com   * **repository_id** is the ID of the repository.   * **category** is the Category where you would like discussion threads to be posted   * **category_id** is the ID of the category noted above   * **mapping** is what the GitHub discussion will be titled   * **reactions_enabled** - 1 means enabled, 0 means disabled   * **emit_metadata** to be referenced via Giscus docs   * **theme** - Options are light or dark | # Settings related to the comments section # embedded within the site. comments:   giscus:     repository: ""     repository_id: ""     category: "Content Discussion"     category_id: "DIC_kwDODmTrrM4B-kuQ"     mapping: "pathname"     reactions_enabled: 1     emit_metadata: 0     theme: "light" |                                                                                                                                                                                     |
| socialbox     | No      | True/false - Determines if the social bar is displayed. Defaults to false if unset. | socialbox: true |

#### Security

The configuration options in this section are focused around enhancing the site's security posture. This is separate to the built-in Hugo privacy controls, focusing on topics such as Content Security Policies.

```yaml
# Settings relating to site security. This mainly
# comprises of Content Security Policies.
security:
  # If all CSP properties are empty strings, then
  # the CSP section will not be rendered. If at least 1
  # contains a string, then it will be rendered.
  csp:
    scriptsrc: ""
    imgsrc: ""
    connectsrc: ""
    framesrc: ""
    objectsrc: ""
```

| Field Name | Required | Description                                                                                                                                                                                                                                                                                                                                      | Example                                                                                                                                                                                                                                                                                                                                                        |
|------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| csp        | No       | This allows the user to configure Content Security Policies for the site, providing a built-in way in the theme to enhance the site's security posture.  * **scriptsrc** relates to script-src * **imgsrc** relates to img-src * **connectsrc** relates to connect-src * **framesrc** relates to frame-src * **objectsrc** relates to object-src | # Settings relating to site security. This mainly # comprises of Content Security Policies. security:   # If all CSP properties are empty strings, then   # the CSP section will not be rendered. If at least 1   # contains a string, then it will be rendered.   csp:     scriptsrc: ""     imgsrc: ""     connectsrc: ""     framesrc: ""     objectsrc: "" |

### Privacy Settings

There are a number of configuration settings built-in to Hugo to help meet Privacy / Data Protection Regulations. The configuration shown is an example configuration. You should make your own decisions on what privacy settings are required, using the [Hugo and the GEneral Data Protection Regulation Documentation](https://gohugo.io/about/hugo-and-gdpr/).

```yaml
# Privacy options built in to hugo. The hugo docs explain how to configure this to align with GDPR, so please make sure to ensure this is configured as appropriate for your deployment.
# -
# https://gohugo.io/about/hugo-and-gdpr/
privacy:
  googleAnalytics:
    anonymizeIP: true
    disable: false
    respectDoNotTrack: true
    useSessionStorage: false
```

### Taxonomy Settings

Taxonomies in hugo are used to easily identify content that belongs to a given piece of metadata. This is particularly useful for tags, or pieces of content that appear in a series. All taxonomies used within the theme are configured below.

> **Note:** If you are unfamiliar with this, then it is recommended to keep this as the default.

```yaml
# Taxonomies in hugo are used to easily identify content that belongs
# to a given piece of metadata. This is particularly useful for tags,
# or pieces of content that appear in a series. All taxonomies used within
# the theme are configured below.
taxonomies:
  tag: "tags"
  series: "series"
```

## Archetypes

Archetypes are a concept within Hugo. They are templates which can be easily used when you want to create new content. You can find more about Archetypes in Hugo [here](https://gohugo.io/content-management/archetypes/).

The Hugo Creator theme leverages a number of archetypes to deliver the site's content. Please refer to the information below on how to use archetypes, so that you can add additional content to your site.

### Blog

To create a new blog post, use the following command in your site folder

```bash
hugo new --kind blog blog/your-blog-slug
```

#### Blog Frontmatter Details

```yaml
---
# Default hugo properties
title: ""                   # Name of the blog
description: ""             # Used for SEO optimisation
publishDate: ""             # TODO: Differentiate between date
date: ""                    # TODO: Differentiate between PublishDate

# Site-wide [required properties]
image: ""                   # Displayed when referenced in listing pages
images:                     # An array of images used in Social Sharing
- ""
tags:                       # Used for SEO optimisation and browsing across the site.
- ""
- ""

# Site-wide [optional properties]
banner: ""                  # Optional, but strongly recommended to give a professional feel
externalLink: ""            # Full URL to override listing links to an external page
series:                     # Array of series (i.e. filenames of the series this is a part of)
- ""

# Content-specific properties
authors:
-  ""                       # An array of authors of the post (filenames in person).
---
Input your blog post content here.
```

### Episode

To create a new episode, use the following command in your site folder

```bash
hugo new --kind episode episode/your-episode-slug
```

#### Episode frontmatter details

```yaml
---
# Default hugo properties
title: ""                   # Name of the episode
description: ""             # Used for SEO optimisation
publishDate: ""             # TODO: Differentiate between date
date: ""                    # TODO: Differentiate between PublishDate

# Site-wide [required properties]
image: ""                   # Displayed when referenced in listing pages
images:                     # An array of images used in Social Sharing
- ""
tags:                       # Used for SEO optimisation and browsing across the site.
- ""
- ""

# Site-wide [optional properties]
banner: ""                  # Optional, but strongly recommended to give a professional feel
externalLink: ""            # Full URL to override listing links to an external page
series:                     # Array of series (i.e. filenames of the series this is a part of)
- ""

# Content-specific properties
episode: ""                 # A shortcode for this episode (used in podcast RSS feed)
explicit: ""                # Whether the episode is explicit - yes / no
guests:                     # Array of guests in the episode (i.e. filenames of those people)
- ""
hosts:                      # Array of hosts in the episode (i.e. filenames of those people)
- ""
podcast_bytes: ""           # Podcast MP3 file size
podcast_duration: ""        # Podcast duration (hours:minutes:seconds miliseconds)
podcast_file: ""            # Podcast filename (will be joined with media_prefix site param).
youtube: ""                 # ID of the YouTube video for this content
---
Input your episode description here.
```

### Person

People are referenced throughout the site. They may be Authors, Guests, Hosts or other types which are created in the future. This is handled under the **Person** archetype.

To create a person, use the following command in your site folder

```bash
hugo new --kind person person/your-person-slug
```

#### Person Frontmatter Details

```yaml
---
# Default hugo properties
title: ""           # Name of the Person
description: ""     # Used for SEO optimisation
publishDate: ""     # TODO: Differentiate between date
date: ""            # TODO: Differentiate between PublishDate

# Site-wide [required properties]
image: ""           # Displayed when referenced in listing pages
images:             # An array of images used in Social Sharing
- ""
tags:               # Used for SEO optimisation and browsing across the site.
- ""
- ""

# Site-wide [optional properties]
externalLink: ""    # Full URL to override listing links to an external page
series:             # Array of series (i.e. filenames of the series this is a part of)
- ""

# Content-specific properties
github: ""          # GitHub profile of the person
linkedin: ""        # GitHub profile of the person (Segment after linkedin.com/in/...)
shortBio: ""        # Used for SEO optimisation
twitter: ""         # Twitter alias of the person, not including an @
website: ""         # Full URL to the person's website
youtube: ""         # YouTube alias of the person's channel (Segment after youtube.com/c/....)
---
Input the person's speaker bio here.
```

### Series

A series page is not strictly required. By default, a series page will be generated based upon the Hugo Taxonomies. However, you probably want to customise the landing page for each series a little! Perhaps adding a blurb for the series, or some other metadata?

To achieve this, use the following command in your site folder

```bash
hugo new --kind series series/your-series-slug
```

#### Series Frontmatter Details

```yaml
---
# Default hugo properties
title: ""           # Name of the Person
description: ""     # Used for SEO optimisation
publishDate: ""     # TODO: Differentiate between date
date: ""            # TODO: Differentiate between PublishDate

# Site-wide [required properties]
banner: ""          # Optional, but strongly recommended to give a professional feel
image: ""           # Displayed when referenced in listing pages
images:             # An array of images used in Social Sharing
- ""
tags:               # Used for SEO optimisation and browsing across the site.
- ""
- ""
---
Input your series description here. It will display on the series listing page.
```

### Talk

To create a new talk, use the following command in your site folder

```bash
hugo new --kind talk talk/your-talk-slug
```

#### Talk Frontmatter Details

```yaml
---
# Default hugo properties
title: ""             # Name of the Person
description: ""       # Used for SEO optimisation
publishDate: ""       # TODO: Differentiate between date
date: ""              # TODO: Differentiate between PublishDate

# Site-wide [required properties]
image: ""             # Displayed when referenced in listing pages
images:               # An array of images used in Social Sharing
- ""
tags:                 # Used for SEO optimisation and browsing across the site.
- ""
- ""

# Site-wide [optional properties]
series:               # Array of series (i.e. filenames of the series this is a part of)
- ""

# Content-specific properties
event:
  attendanceType: ""  # physical, virtual, hybrid
  organizerName: ""   # Name of the organising group / event (e.g. Name of the conference)
  organizerUrl: ""    # URL of the organising group
  eventUrl: ""        # URL of the specific event, if applicable (e.g. a meetup talk, rather than the meetup group)
  type: ""            # Type of event (e.g. Meetup, Conference, etc.)
  location: ""        # Required for physical and hybrid events.
  cost: ""            # Cost to attend the event
  costCurrency: ""    # Cost currency for the event. Use a standard format - http://en.wikipedia.org/wiki/ISO_4217
  available: "" # Whether registration/ticket purchases/etc. are still available (true/false). Defaults to false when event is in past.
speakers:             # Array of hosts in the episode (i.e. filenames of those people).
- ""
youtube: ""           # ID of the YouTube video for this content
---
Input your talk description here.
```