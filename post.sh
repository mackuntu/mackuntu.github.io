#!/bin/sh
function usage(){
echo "usage: post.sh 'blurb'"
exit
}

if [ $# -lt 1 ]; then
usage
fi

today=`date +%Y-%m-%d`
title=$1
string=$today
for arg in $@
do
string=${string}-$arg
done
echo "creating draft.. $string"
cat << TEMP  > _drafts/$string.markdown
---
layout: post
title: $string
categories: []
tags: [green]
description: 
author: martin
image: 
featured: true
hidden: false
rating: 4.5
comments: true
---
TEMP
#cp _templates/empty.markdown _drafts/$string.markdown
