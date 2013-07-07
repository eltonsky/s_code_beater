#!/usr/bin/python

import sys

if len(sys.argv) < 2:
    print "Usage: python s_code_beater.py inputPath outputPath"
    sys.exit(0)

class Line:
    val=""
    indent=0
    if_print=1

    #static
    commContinue = 0

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

    @staticmethod
    def add_indent(count):
        inds = ""
        for i in range(1,count+1):
            inds += '\t'

        return inds

    def process(self):
        next_indent = self.indent
        s =""

        line = self.val.strip()

        #handle multiline comments "/**/", read till the end
        if Line.commContinue == 1:
            if line.endswith('*/\n'):
                Line.commContinue = 0
            return next_indent

        if line.startswith('//'):
            return next_indent
        elif line.startswith('/*'):
            if not line.endswith('*/\n'):
                Line.commContinue = 1
            return next_indent

        for i in range(0,len(line)):
            if line[i] == ';':
                s += line[i] + '\n'
                if len(line) > i+1:
                    s += Line.add_indent(next_indent)
            elif line[i] == '}':
                next_indent -= 1
                s += '\n' +  Line.add_indent(next_indent) + line[i] + '\n' + Line.add_indent(next_indent)
            elif line[i] == '{':
                next_indent += 1
                s += line[i] + '\n'
                if len(line) > i+1:
                    s += Line.add_indent(next_indent)
            else:
                s += line[i]
#            print "##"+s

        self.val = s
        return next_indent


prevLine = None 
currLine = None
next_ind = 0

with open(sys.argv[1]) as infile:
    for line in infile:
        currLine = Line(line, next_ind)
        
        next_ind = currLine.process()

   #     line = line.strip()

   #     #if line.startswith('//',0,2): we don't care this case, just print
   #     if line.startswith('}') and not prevLine.val.strip().endswith('{'):
   #         currIndent -= 1
   #         currLine.indent = currIndent

   #     if line.endswith('{'):
   #         currIndent += 1
            
        currLine.line_print()
                  
        prevLine = currLine                      


