#ifndef SRC_SHADER_HPP
#define SRC_SHADER_HPP

    #include <Utilities.hpp>
    namespace prj
    {
        class Shader
        {
            private:
                unsigned programID;
            public:
                Shader(std::string name);
                void use() { glUseProgram(programID); }
                unsigned ID() { return programID; }

                void setBool(const std::string &name, bool value) const { glUniform1i(glGetUniformLocation(programID, name.c_str()), (int)value); }
                void setInt(const std::string &name, int value) const { glUniform1i(glGetUniformLocation(programID, name.c_str()), value); }
                void setFloat(const std::string &name, float value) const { glUniform1f(glGetUniformLocation(programID, name.c_str()), value); }

                void setVec2(const std::string &name, const glm::vec2 &value) const { glUniform2fv(glGetUniformLocation(programID, name.c_str()), 1, &value[0]); }
                void setVec3(const std::string &name, const glm::vec3 &value) const { glUniform3fv(glGetUniformLocation(programID, name.c_str()), 1, &value[0]); }
                void setVec4(const std::string &name, const glm::vec4 &value) const { glUniform4fv(glGetUniformLocation(programID, name.c_str()), 1, &value[0]); }

                void setMat2(const std::string &name, const glm::mat2 &mat) const { glUniformMatrix2fv(glGetUniformLocation(programID, name.c_str()), 1, GL_FALSE, &mat[0][0]); }
                void setMat3(const std::string &name, const glm::mat3 &mat) const { glUniformMatrix3fv(glGetUniformLocation(programID, name.c_str()), 1, GL_FALSE, &mat[0][0]); }
                void setMat4(const std::string &name, const glm::mat4 &mat) const { glUniformMatrix4fv(glGetUniformLocation(programID, name.c_str()), 1, GL_FALSE, &mat[0][0]); }
        };
    }

#endif