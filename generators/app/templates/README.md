<%= projectName %>
<%= '='.repeat(Math.max(3, projectName.length)) %>

  > <%= projectDescription %>

---
<% if (toc === '' || toc === false || toc === 'false' ) {} else if (toc && toc.length) { %>
<%= toc %>
<% } else { %>
<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [License](#license)

<!-- /TOC -->

---
<% } %>
<% if (content === '' || content === false || content === 'false' ) {} else if (content && content.length) { %>
<%= content%>
<% } else if (content !== '' && content !== false) { %>
## About

…
<% } %>

## License

<%= license %> © <%= licenseYear %> <%= authorName %>
