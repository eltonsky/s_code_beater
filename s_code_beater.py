#!/usr/bin/python

import sys

if len(sys.argv) < 2:
    print "Usage: python s_code_beater.py inputPath outputPath"
    sys.exit(0)

class Line:
    val=""
    indent=0
    if_print=1

    def __init__(self, line, indent=0, if_print=1):
        self.val = line
        self.indent = indent
        self.if_print=if_print

    def line_print(self):
        i = 0 
        while i < self.indent:
            sys.stdout.write('\t')
            i += 1
        
        sys.stdout.write(self.val)

    def add_indent(count):
        inds = ""
        for i in range(0,count):
            inds += '\t'

        return inds

    def process(self):
        eff_indent = self.indent
        print_val=""
        for i in range(0,len(self.val)):
            s += self.val[i]
            if self.val[i] == ';' or self.val[i] == ',':
                s += '\n' + Line.add_indent(eff_indent)
            elif self.val[i] == '}':
                eff_indent -= 1
                s += '\n' + Line.add_indent(eff_indent)
            elif self.val[i] == '{':
                eff_indent += 1 
                s += '\n' + Line.add_indent(eff_indent)

        return eff_indent


prevLine = None 
currLine = None
currIndent = 0

with open(sys.argv[1]) as infile:
    for line in infile:
        currLine = Line(line)
        
        currLine.indent = currIndent

        line = line.strip()

        #if line.startswith('//',0,2): we don't care this case, just print
        if line.startswith('}') and not prevLine.val.strip().endswith('{'):
            currIndent -= 1
            currLine.indent = currIndent

        if line.endswith('{'):
            currIndent += 1
            
        currLine.line_print()
                  
        prevLine = currLine                      


