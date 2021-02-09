package io.dkintelligence.vrbd.services;

import io.dkintelligence.vrbd.exeptions.UserIdException;
import io.dkintelligence.vrbd.exeptions.UserNotFoundException;
import io.dkintelligence.vrbd.exeptions.UsernameAlreadyExistsException;
import io.dkintelligence.vrbd.model.User;
import io.dkintelligence.vrbd.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Locale;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser){
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
//             Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            newUser.setRole(newUser.getRole().toUpperCase());

//        Make sure that password and confirmPassword match
//        We don't persist or show the confirm password
            newUser.setConfirmPassword("");
//            System.out.println(newUser.getAuthorities());
            return userRepository.save(newUser);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("username '" + newUser.getUsername() + "' already exists");
        }

    }

    public User getUserById(Long id, String username){
        User user = userRepository.getById(id);
        if(user == null){
            throw  new UserIdException("User ID '" + id + "' doesn't exists");
        }
        if(!user.getUsername().equals(username)){
            throw new UserNotFoundException("User not found");
        }
        return user;
    }


    public User updateUser(Long id, User update, String username) {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UserNotFoundException("user not found");
        }
        try{
           user.setUsername(update.getUsername());
           user.setName(update.getName());
           user.setSurname(update.getSurname());
           user.setGender(update.getGender());
           user.setRole(update.getRole().toUpperCase());
         return userRepository.save(user);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("username '" + update.getUsername() + "' already exists");
        }
    }
}
