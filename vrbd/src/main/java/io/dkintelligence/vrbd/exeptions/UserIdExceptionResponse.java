package io.dkintelligence.vrbd.exeptions;



public class UserIdExceptionResponse {

   private String id;

    public UserIdExceptionResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
}
