if (-1 != navigator.userAgent.indexOf("Firefox"))
{
    document.addEventListener && document.addEventListener("DOMContentLoaded", init, !1);
}
else
{
    window.addEventListener("load", init, false);
}

function init()
{
    const sticky_navbar_id = "sticky_navbar";
    const sticky_navbar    = document.getElementById(sticky_navbar_id);
    if (null == sticky_navbar)
    {
        logger?.warn("Element " + sticky_navbar_id + " not found");
        return;
    }
    logger?.debug("Element " + sticky_navbar.id + " add sticky attribute");

    const navbar = sticky_navbar.cloneNode(true);
    navbar.id    = "navbar";

    sticky_navbar.after(navbar);
    logger?.debug("Element " + sticky_navbar.id + " set hide");
    sticky_navbar.style[ "display" ] = "none";
    sticky_navbar.style[ "position" ] = "fixed";
    sticky_navbar.style[ "top" ]      = "0";
    sticky_navbar.style[ "width" ]    = "100%";

    window.onscroll = function() { stickyFunction(sticky_navbar, navbar) };
    document.addEventListener("DOMContentLoaded", (function(e) {
                                  var t = localStorage.getItem("scrollpos");
                                  if (null !== t)
                                  {
                                      window.scrollTo(0, t);
                                  }
                              }));
    window.onbeforeunload = function(e) { localStorage.setItem("scrollpos", window.scrollY) };
}

function stickyFunction(sticky_navbar, navbar)
{
    const windows_scoll_y_pos = window.pageYOffset;
    logger?.debug("Y-scoll-pos = " + windows_scoll_y_pos);

    const sticky_attribute = "sticky";
    if (windows_scoll_y_pos >= navbar.offsetTop)
    {
        if (sticky_navbar.style[ "display" ] != "block")
        {
            sticky_navbar.style[ "display" ] = "block";
            logger?.debug("Enable " + sticky_navbar.id + " " + sticky_attribute + " attribute");
        }
    }
    else
    {
        if (sticky_navbar.style[ "display" ] != "none")
        {
            sticky_navbar.style[ "display" ] = "none";
            logger?.debug("Disable " + sticky_navbar.id + " " + sticky_attribute + " attribute");
        }
    }
}