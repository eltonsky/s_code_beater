#!/usr/bin/python

import sys

if len(sys.argv) < 2:
    print "Usage: python s_code_beater.py inputPath outputPath"
    sys.exit(0)

class Line:
    val=""
    indent=0
    if_print=1
    new_func_stack=[]

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

    @staticmethod
    def handle_bracket(line, beg, end):
       for i in range(beg,end):
          if line[i] == '(':
              Line.new_func_stack.append('(')
          elif line[i] == ')':
              Line.new_func_stack.pop()


    @staticmethod
    def extra_indent(line, idx):
       new_line_list = ['\n', ';', '}', '{']
       str1="new Function"
       new_line_index = -1
       k = idx - 1

  #     print "## idx "  + str(idx)

       while k >=0:
           for i, s in enumerate(new_line_list):
               if line[k] in s:
                   new_line_index = k
                   break 
               if line[k] == 'n' and k > 0 and line[k-1] == '\\':
                   new_line_index = k-1
                   break         
           k -= 1                                                   
           if new_line_index != -1:
                break
           
       str1_index = line[:idx].rfind(str1)
       

#       print "## new_line_index "+ str(new_line_index)+","+str(str1_index) 
       if str1_index > -1 and str1_index > new_line_index:
            # store brackets hist for adjust indent
            Line.handle_bracket(line,str1_index,idx)
 #          print "return 1"
            return 1                                       
                
#       print "return 0"
       return 0 


    def process(self):
        next_indent = self.indent
        s =""

        line = self.val

        for i in range(0,len(line)):
            if line[i] == ';':
                # if it's in "new Funcation" block, needs one extra indent
                # if we need extra indent just set next_indent to 1
             #   extra = Line.extra_indent(line, i)
              #  if extra == 1:
               #     next_indent = 1

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
            #elif line[i] == '(' and len(Line.new_func_stack) > 0:
            #    Line.new_func_stack.append('(')
            #    s += line[i] 
            #elif line[i] == ')' and len(Line.new_func_stack) > 0:
            #    Line.new_func_stack.pop()
            #    if len(Line.new_func_stack) == 0:
            #        next_indent -= 1
            #    s += line[i] 
            else:
                s += line[i]
#            print "##"+s

        self.val = s
        return next_indent


prevLine = None 
currLine = None
next_ind = 0
commContinue = 0
all_line = ""

with open(sys.argv[1]) as infile:
    for line in infile:
        # keep empty lines
        if line=='\n':
            all_line += line
            continue

        line = line.strip()

    	#handle multiline comments "/**/", read till the end
        if commContinue == 1:
            if line.endswith('*/'):
                commContinue = 0
            all_line += line + '\n'
            continue

        if line.startswith('//'):
            all_line += line + '\n'
            continue
        elif line.startswith('/*'):
            if not line.endswith('*/'):
                commContinue = 1
            all_line +=line  + '\n'
            continue

        # append everything else into single str to process
        if line.endswith('"'):
            line = line[:-1]

        if line.startswith('+"'):
            line = line[2:]

        all_line += line


    currLine = Line(all_line, next_ind)
        
    currLine.process()
            
    currLine.line_print()
                  

