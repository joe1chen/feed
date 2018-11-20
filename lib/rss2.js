"use strict";
/// <reference path="types/index.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var xml = require("xml");
var config_1 = require("./config");
var feed_1 = require("./feed");
var DOCTYPE = '<?xml version="1.0" encoding="utf-8"?>\n';
exports.default = (function (ins) {
    var options = ins.options;
    var isAtom = false;
    var isContent = false;
    var channel = [
        { title: options.title },
        { link: options.link },
        { description: options.description },
        {
            lastBuildDate: options.updated ? options.updated.toUTCString() : new Date().toUTCString()
        },
        { docs: "http://blogs.law.harvard.edu/tech/rss" },
        { generator: options.generator || config_1.generator }
    ];
    var rss = [{ _attr: { version: "2.0" } }, { channel: channel }];
    /**
     * Channel Image
     * http://cyber.law.harvard.edu/rss/rss.html#ltimagegtSubelementOfLtchannelgt
     */
    if (options.image) {
        channel.push({
            image: [{ title: options.title }, { url: options.image }, { link: options.link }]
        });
    }
    /**
     * Channel Copyright
     * http://cyber.law.harvard.edu/rss/rss.html#optionalChannelElements
     */
    if (options.copyright) {
        channel.push({ copyright: options.copyright });
    }
    /**
     * Channel Categories
     * http://cyber.law.harvard.edu/rss/rss.html#comments
     */
    ins.categories.forEach(function (category) {
        channel.push({ category: category });
    });
    /**
     * Feed URL
     * http://validator.w3.org/feed/docs/warning/MissingAtomSelfLink.html
     */
    var atomLink = options.feed || (options.feedLinks && options.feedLinks.atom);
    if (atomLink) {
        isAtom = true;
        channel.push({
            "atom:link": {
                _attr: {
                    href: atomLink,
                    rel: "self",
                    type: "application/rss+xml"
                }
            }
        });
    }
    /**
     * Hub for PubSubHubbub
     * https://code.google.com/p/pubsubhubbub/
     */
    if (options.hub) {
        isAtom = true;
        channel.push({
            "atom:link": {
                _attr: {
                    href: options.hub,
                    rel: "hub"
                }
            }
        });
    }
    /**
     * Channel Categories
     * http://cyber.law.harvard.edu/rss/rss.html#hrelementsOfLtitemgt
     */
    ins.items.forEach(function (entry) {
        var item = [];
        if (entry.title) {
            item.push({ title: { _cdata: entry.title } });
        }
        if (entry.link) {
            item.push({ link: entry.link });
        }
        if (entry.guid) {
            item.push({ guid: entry.guid });
        }
        else if (entry.link) {
            item.push({ guid: entry.link });
        }
        if (entry.date) {
            item.push({ pubDate: entry.date.toUTCString() });
        }
        if (entry.description) {
            item.push({ description: { _cdata: entry.description } });
        }
        if (entry.content) {
            isContent = true;
            item.push({ "content:encoded": { _cdata: entry.content } });
        }
        /**
         * Item Author
         * http://cyber.law.harvard.edu/rss/rss.html#ltauthorgtSubelementOfLtitemgt
         */
        if (Array.isArray(entry.author)) {
            entry.author.map(function (author) {
                if (author.email && author.name) {
                    item.push({ author: author.email + " (" + author.name + ")" });
                }
            });
        }
        if (entry.image) {
            item.push({ enclosure: [{ _attr: { url: entry.image } }] });
        }
        feed_1.ifTruePushArray(entry.elements, item);
        channel.push({ item: item });
    });
    feed_1.ifTruePushArray(ins.elements, channel);
    if (isContent) {
        rss[0]._attr["xmlns:content"] = "http://purl.org/rss/1.0/modules/content/";
    }
    if (isAtom) {
        rss[0]._attr["xmlns:atom"] = "http://www.w3.org/2005/Atom";
    }
    Object.keys(ins.namespaces).forEach(function (ns) {
        rss[0]._attr[ns] = ins.namespaces[ns];
    });
    return DOCTYPE + xml([{ rss: rss }], true);
});