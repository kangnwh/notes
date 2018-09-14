for (block of $('code')) {
    code = block.innerHTML;
    raw_html = $('<div/>').text(code).html();
    lines = raw_html.split('\n').slice(1,-1);
    first = lines[0];
    blank_count = 0;
    for(i=0;i<first.length;i++){
        if(first[i] != " "){
            blank_count = i;
            break;
        }
    }
    html = first.trim() + '\n';
    for(i=1;i<lines.length;i++){
        html = html + lines[i].substr(blank_count) + '\n';
    }

    block.innerHTML = html;
}