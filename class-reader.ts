import * as ts from 'typescript';

export class ClassReader {

  constructor() {
    this.methode();
  }

  methode() {
    const program = ts.createProgram(['./models.ts'], {
      module: ts.ModuleKind.ES2015,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      target: ts.ScriptTarget.Latest
    });
    
    const typeChecker = program.getTypeChecker();
    
    
    program.getSourceFiles()
      .filter(sourceFile => sourceFile.fileName.includes('models'))
      .forEach(node => {
    
        const statements = node.statements.filter(s => ts.isClassDeclaration(s));
    
        statements.forEach(statement => {
          const type = typeChecker.getTypeAtLocation(statement);
    
          console.log(JSON.stringify((statement as any).name.escapedText, null, '\t'));
    
          for (const property of type.getProperties()) {
            const propertyType = typeChecker.getTypeOfSymbolAtLocation(property, statement);
            console.log("Name:", property.name, "Type:", typeChecker.typeToString(propertyType));
          }
        });
      })
  }
}
