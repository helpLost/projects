#include <Shader.hpp>
void compileShaders(unsigned &v, unsigned &f, const char* vCode, const char* fCode), compileProgram(unsigned &program, unsigned vertex, unsigned fragment);

namespace prj
{
    Shader::Shader(std::string name)
    {
        std::string vertexCode, fragmentCode;
        std::ifstream v("../src/res/shaders/" + name + ".vs"), f("../src/res/shaders/" + name + ".fs");
        if (v && f) {
            std::stringstream vShaderStream, fShaderStream;
            vShaderStream << v.rdbuf();
            fShaderStream << f.rdbuf();

            v.close(), f.close();
            vertexCode = vShaderStream.str();
            fragmentCode = fShaderStream.str();

            const char* vShaderCode = vertexCode.c_str();
            const char* fShaderCode = fragmentCode.c_str();

            unsigned vertex, fragment;
            compileShaders(vertex, fragment, vShaderCode, fShaderCode);
            compileProgram(programID, vertex, fragment);

            glDeleteShader(vertex);
            glDeleteShader(fragment);
            std::cout << "Shader file loaded: " << name << std::endl;
        }
        else { utl::end("A shader file couldn't be opened. Please check all file paths."); }
    }
}

void checkErrors(unsigned &shader, bool type, int hex)
{
    int success = 0;
    char infoLog[1024];
    if (!type) { glGetShaderiv(shader, GL_COMPILE_STATUS, &success); } else { glGetProgramiv(shader, GL_LINK_STATUS, &success); }
    if (!success)
    {
        if (!type) { glGetShaderInfoLog(shader, 1024, NULL, infoLog); } else { glGetProgramInfoLog(shader, 1024, NULL, infoLog); }
        utl::end("Shader Compilation Failed. Something Went Very Wrong. Error For Shader " + std::to_string(hex) + ":\n" + infoLog);
    }
}
void compileShaders(unsigned &v, unsigned &f, const char* vCode, const char* fCode)
{
    v = glCreateShader(GL_VERTEX_SHADER), f = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(v, 1, &vCode, NULL), glShaderSource(f, 1, &fCode, NULL);
    glCompileShader(v), glCompileShader(f);

    checkErrors(v, false, GL_VERTEX_SHADER), checkErrors(f, false, GL_FRAGMENT_SHADER);
}
void compileProgram(unsigned &program, unsigned vertex, unsigned fragment)
{
    program = glCreateProgram();
    glAttachShader(program, vertex);
    glAttachShader(program, fragment);
    glLinkProgram(program);
    checkErrors(program, true, 0);
}