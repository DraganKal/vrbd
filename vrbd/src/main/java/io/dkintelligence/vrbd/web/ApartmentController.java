package io.dkintelligence.vrbd.web;

import io.dkintelligence.vrbd.model.Apartment;
import io.dkintelligence.vrbd.services.ApartmentService;
import io.dkintelligence.vrbd.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/apartments")
@CrossOrigin
public class ApartmentController {

    @Autowired
    ApartmentService apartmentService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/allByHost")
    public Iterable<Apartment> getAllApartmentsByHost(Principal principal){
        return apartmentService.findAllApartmentsByHostUsername(principal.getName());
    }

    @PostMapping("")
    public ResponseEntity<?> createNewApartment(@Valid @RequestBody Apartment apartment, BindingResult result, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Apartment newApartment = apartmentService.saveApartment(apartment, principal.getName());
        return new ResponseEntity<>(newApartment, HttpStatus.CREATED);
    }

}
