Issue:

Requests sent to a url with a non-blank URI will 404.

Solution:

Add redirects to nginx. See the following "try_files" example:

https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#front-controller-pattern-web-apps

The following page on redirects from Mozilla might also be relevant:

https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections

Issue:

Requests sent to a url with a non-blank URI will not navigate.

Potential Solution:

Add a query key with a query value of the URI submitted to the redirected URL. If the Angular app sees the query, activate a route with the value of the query.
