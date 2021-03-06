<?php

/*
Todos items:
name,
listid,
userid,
createdAt,
completed
 */

function todos_getAll()
{
    try {
        $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
        $filters = [];
        $query = new MongoDB\Driver\Query($filters);
        $res = $manager->executeQuery('todos.todos', $query);
        $todos = array();
        foreach ($res as $row) {
            $item = new stdClass();
            foreach ($row as $key => $value) {
                if ($key == '_id') {
                    $value = (string)$value;
                }
                $item->$key = $value;
            }
            $todos[] = $item;
        }
        return $todos;
    } catch (Throwable $e) {
        print_r("Throwable\n");
        print_r($e->getMessage() . "\n");
    } catch (Exception $e) {
        print_r("Exception\n");
        print_r($e->getMessage() . "\n");
    }
    die;
}

function todos_getOne($id)
{
    try {
        $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
        $filters = [
            '_id' => new MongoDB\BSON\ObjectID($id)
        ];
        $query = new MongoDB\Driver\Query($filters);
        $res = $manager->executeQuery('todos.todos', $query);
        $todos = array();
        foreach ($res as $row) {
            $item = new stdClass();
            foreach ($row as $key => $value) {
                if ($key == '_id') {
                    $value = (string)$value;
                }
                $item->$key = $value;
            }
            $todos[] = $item;
        }
        return $todos;
    } catch (Throwable $e) {
        print_r("Throwable\n");
        print_r($e->getMessage() . "\n");
    } catch (Exception $e) {
        print_r("Exception\n");
        print_r($e->getMessage() . "\n");
    }
    die;
}

function todos_postItem()
{
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data)) {
            print_r("Empty data for insert\n");
            die;
        }
        $newItem = [
            '_id' => new MongoDB\BSON\ObjectID(),
            'email' => $data['email'],
            'password' => $data['password']
        ];
        $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->insert($newItem);
        $manager->executeBulkWrite('todos.todos', $bulk);
        return todos_getOne((string)$newItem['_id']);
    } catch (Throwable $e) {
        print_r("Throwable\n");
        print_r($e->getMessage() . "\n");
    } catch (Exception $e) {
        print_r("Exception\n");
        print_r($e->getMessage() . "\n");
    }
    die;
}

function todos_putItems($id)
{
    try {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data)) {
            print_r("Empty data for update\n");
            die;
        }
        $filter = ['_id' => new MongoDB\BSON\ObjectID($id)];
        $update = [];
        if (isset($data['email']) && !empty($data['email'])) {
            $update['email'] = $data['email'];
        }
        if (isset($data['password']) && !empty($data['password'])) {
            $update['password'] = $data['password'];
        }
        $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->update($filter, $update);
        $manager->executeBulkWrite('todos.todos', $bulk);
        return todos_getOne($id);
    } catch (Throwable $e) {
        print_r("Throwable\n");
        print_r($e->getMessage() . "\n");
    } catch (Exception $e) {
        print_r("Exception\n");
        print_r($e->getMessage() . "\n");
    }
    die;
}

function todos_deleteItems($id)
{
    try {
        $filter = ['_id' => new MongoDB\BSON\ObjectID($id)];
        $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->delete($filter);
        $manager->executeBulkWrite('todos.todos', $bulk);
        return ['result' => true];
    } catch (Throwable $e) {
        print_r("Throwable\n");
        print_r($e->getMessage() . "\n");
    } catch (Exception $e) {
        print_r("Exception\n");
        print_r($e->getMessage() . "\n");
    }
    die;
}

$todos = [];

switch (strtolower($_SERVER['REQUEST_METHOD'])) {
    case 'get':
        if (!empty($_GET) && isset($_GET['_id']) && !empty($_GET['_id'])) {
            $todos = todos_getOne($_GET['_id']);
        } else {
            $todos = todos_getAll();
        }
        break;
    case 'post':
        $todos = todos_postItem();
        break;
    case 'put':
        if (!empty($_GET) && isset($_GET['_id']) && !empty($_GET['_id'])) {
            $todos = todos_putItems($_GET['_id']);
        } else {
            print_r("User id can't be empty.\n");
            die;
        }
        break;
    case 'delete':
        if (!empty($_GET) && isset($_GET['_id']) && !empty($_GET['_id'])) {
            $todos = todos_deleteItems($_GET['_id']);
        } else {
            print_r("User id can't be empty.\n");
            die;
        }
        break;
}
header('HTTP/1.1 200 OK', true, 200);
header('Content-Type: application/json');
echo json_encode($todos);
exit(0);