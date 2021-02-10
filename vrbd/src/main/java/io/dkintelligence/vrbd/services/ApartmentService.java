package io.dkintelligence.vrbd.services;

import io.dkintelligence.vrbd.model.Apartment;
import io.dkintelligence.vrbd.model.User;
import io.dkintelligence.vrbd.repositories.ApartmentRepository;
import io.dkintelligence.vrbd.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApartmentService {

    @Autowired
    private ApartmentRepository apartmentRepository;
    @Autowired
    private UserRepository userRepository;


    public Iterable<Apartment> findAllApartmentsByHostUsername(String username){
        return apartmentRepository.findAllByHostUsername(username);
    }

    public Apartment saveApartment(Apartment apartment, String username){
//        try{
            User user = userRepository.findByUsername(username);
            apartment.setHost(user);
            return apartmentRepository.save(apartment);
//        } catch (Exception e) {
//            throw new Apar;
//        }

    }




}
