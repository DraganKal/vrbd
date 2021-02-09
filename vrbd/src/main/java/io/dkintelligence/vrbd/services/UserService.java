package io.dkintelligence.vrbd.services;

import io.dkintelligence.vrbd.exeptions.UsernameAlreadyExistsException;
import io.dkintelligence.vrbd.model.User;
import io.dkintelligence.vrbd.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

}
